import i18next from "i18next";

export const STATUS_DRAFT = "draft";
export const STATUS_PUBLISHED = "published";
export const STATUS_PLANNED = "planned";

export const statusMode = (status: string) => {
    switch (status) {
        case STATUS_DRAFT :
            return "secondary";
        case STATUS_PUBLISHED :
            return "success";
        case STATUS_PLANNED :
            return "primary";
    }
};

export const statusText = (status: string) => {
    return i18next.t(`statuses.${status}`);
};
