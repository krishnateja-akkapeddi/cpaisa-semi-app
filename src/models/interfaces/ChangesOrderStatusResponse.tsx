import {ErrorEntity} from './ErrorEntity';

export type ChangesOrderStatusResponse = {
  success: boolean;
  message: string;
  errors?: ErrorEntity;
};
