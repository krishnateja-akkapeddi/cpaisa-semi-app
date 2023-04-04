import {ErrorEntity} from './ErrorEntity';

export interface NotificationsResponse {
  success: boolean;
  notifications: NotificationEntity[];
  total: number;
  last_page: number;
  errors?: ErrorEntity;
}

export interface NotificationEntity {
  id: number;
  title: string;
  description: string;
  sent: number;
  device_id: number;
  user_id: number;
  url: any;
}
