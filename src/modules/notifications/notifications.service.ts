import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { UserRole } from '../auth/enums/user-role.enum';

export enum NotificationType {
  RESERVATION_FULFILLED = 'RESERVATION_FULFILLED',
  BOOK_DUE_SOON = 'BOOK_DUE_SOON',
  BOOK_OVERDUE = 'BOOK_OVERDUE',
  RESERVATION_EXPIRING = 'RESERVATION_EXPIRING',
  SYSTEM_NOTIFICATION = 'SYSTEM_NOTIFICATION',
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  createdAt: Date;
  read: boolean;
}

@Injectable()
export class NotificationsService {
  private notifications: Map<string, Notification[]> = new Map();

  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  async sendNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    data?: any,
  ): Promise<void> {
    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title,
      message,
      data,
      createdAt: new Date(),
      read: false,
    };

    // Store notification
    const userNotifications = this.notifications.get(userId) || [];
    userNotifications.push(notification);
    this.notifications.set(userId, userNotifications);

    // Send real-time notification
    this.notificationsGateway.server.to(userId).emit('notification', notification);
  }

  async sendRoleNotification(
    role: UserRole,
    type: NotificationType,
    title: string,
    message: string,
    data?: any,
  ): Promise<void> {
    this.notificationsGateway.server.to(`role:${role}`).emit('notification', {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title,
      message,
      data,
      createdAt: new Date(),
      read: false,
    });
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.notifications.get(userId) || [];
  }

  async markAsRead(userId: string, notificationId: string): Promise<void> {
    const userNotifications = this.notifications.get(userId) || [];
    const notification = userNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.notifications.set(userId, userNotifications);
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    const userNotifications = this.notifications.get(userId) || [];
    userNotifications.forEach(notification => {
      notification.read = true;
    });
    this.notifications.set(userId, userNotifications);
  }

  async deleteNotification(userId: string, notificationId: string): Promise<void> {
    const userNotifications = this.notifications.get(userId) || [];
    const filteredNotifications = userNotifications.filter(n => n.id !== notificationId);
    this.notifications.set(userId, filteredNotifications);
  }
} 