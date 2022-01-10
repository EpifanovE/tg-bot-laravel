import {toast} from "react-toastify";
import i18next from "i18next";
import {IAlert} from "../types/app";

export function successAlert(message: string) {
    toast.success(message)
}

export function errorAlert(message: string) {
    toast.error(message)
}

export function saveSuccessAlert() {
    toast.success(i18next.t("messages.saveSuccess"));
}

export function createSuccessAlert() {
    toast.success(i18next.t("messages.createSuccess"));
}

export function deleteSuccessAlert() {
    toast.success(i18next.t("messages.deleteSuccess"));
}

export function showAlerts(alerts: Array<IAlert>) {
    alerts.forEach(alert => {
        if (alert.mode === "success") {
            toast.success(alert.message)
        } else if (alert.mode === "danger") {
            toast.error(alert.message)
        } else {
            toast(alert.message)
        }
    });
}
