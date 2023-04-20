import {NotificationsResponse} from '../../models/interfaces/NotificationsResponse';

export interface FetchNotifications {
  fetch(page: number): Promise<NotificationsResponse>;
}
