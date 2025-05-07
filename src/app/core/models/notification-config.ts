import {InjectionToken} from '@angular/core';

export interface NotificationConfig {
    timeOut: number;
    progressBar: boolean;
    closeButton: boolean;
    enableHtml: boolean;
    positionClass: string;
    preventDuplicates: boolean;
    maxOpened: number;
}

export const DEFAULT_NOTIFICATION_CONFIG: NotificationConfig = {
    timeOut: 3000,
    progressBar: true,
    closeButton: true,
    enableHtml: true,
    positionClass: 'toast-center-center',
    preventDuplicates: true,
    maxOpened: 1
};

export const NOTIFICATION_CONFIG = new InjectionToken<NotificationConfig>('notification.config');

