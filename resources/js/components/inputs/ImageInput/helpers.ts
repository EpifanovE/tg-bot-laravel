export const isImage = (file: any): boolean => {

    if (typeof file === "string") {
        return true;
    }

    if (!!file?.file?.type) {
        return file.file.type?.includes("image/");
    }

    if (!!file.mime) {
        return file.mime?.includes("image/");
    }

    return false;
}
