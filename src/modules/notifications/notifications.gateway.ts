import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../auth/guards/ws-jwt-auth.guard';
import { UserRole } from '../auth/enums/user-role.enum';

@WebSocketGateway({
  cors: {
    origin: '*', // Configure this based on your frontend URL
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets: Map<string, Socket[]> = new Map();

  async handleConnection(client: Socket) {
    try {
      // Extract user ID from socket handshake auth
      const userId = client.handshake.auth.userId;
      const userRole = client.handshake.auth.role;

      if (!userId || !userRole) {
        client.disconnect();
        return;
      }

      // Join user-specific room
      client.join(userId);

      // Join role-specific room
      client.join(`role:${userRole}`);

      // Store socket reference
      const userSockets = this.userSockets.get(userId) || [];
      userSockets.push(client);
      this.userSockets.set(userId, userSockets);

      console.log(`Client connected: ${userId}`);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.auth.userId;
    if (userId) {
      const userSockets = this.userSockets.get(userId) || [];
      const index = userSockets.indexOf(client);
      if (index > -1) {
        userSockets.splice(index, 1);
        this.userSockets.set(userId, userSockets);
      }
      console.log(`Client disconnected: ${userId}`);
    }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.join(room);
    return { event: 'joinRoom', data: { room } };
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.leave(room);
    return { event: 'leaveRoom', data: { room } };
  }
} 