import {v4 as uuidv4} from "uuid";

import {IAlert} from "../types/app";

let subscribers: SubscriberType[] = [];

function createChannel(adminId: number) {
    window.Echo.private(`admins.notifications.${adminId}`)
        .notification((notification: NotificationFromServerType) => {
            if (!notification.message) {
                return
            }

            const alert: IAlert = {
                message: notification.message ? notification.message : "",
                mode: !!notification.mode ? notification.mode : "info",
                id: !!notification.id ? notification.id : uuidv4() as string
            };

            if (!alert.message) {
                return
            }

            subscribers.forEach(s => {
                s(alert)
            })
        });
}

export const notificationsProvider = {
    start(adminId: number) {
        createChannel(adminId)
    },
    subscribe(cb: SubscriberType) {
        subscribers.push(cb);
        return () => {
            subscribers = subscribers.filter(s => s !== cb);
        }
    },
    unsubscribe(cb: SubscriberType) {
        subscribers = subscribers.filter(s => s !== cb);
    }
};

type SubscriberType = (message: IAlert) => void

type NotificationFromServerType = {
    id?: string,
    message?: string,
    mode?: string
}
