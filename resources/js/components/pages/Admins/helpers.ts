import i18next from "i18next";

export const STATUS_PENDING= "pending";
export const STATUS_ACTIVE= "active";
export const STATUS_DISABLED = "disabled";

export const statusMode = (status: string) => {
    switch (status) {
        case STATUS_PENDING :
            return "warning";
        case STATUS_ACTIVE :
            return "success";
        case STATUS_DISABLED :
            return "danger";
    }
};

export const statusText = (status: string) => {
    return i18next.t(`statuses.admin.${status}`);
};
