import i18next from "i18next";

export const permissionLabel = (permission: string) => {
    return i18next.t(`permissions.${permission}`);
};
