import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsService } from './notifications.service';
import { AuthModule } from '../auth/auth.module';
import { WsJwtAuthGuard } from '../auth/guards/ws-jwt-auth.guard';

@Module({
  imports: [AuthModule],
  providers: [NotificationsGateway, NotificationsService, WsJwtAuthGuard],
  exports: [NotificationsService],
})
export class NotificationsModule {} 