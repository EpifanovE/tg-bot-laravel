import React, {useEffect, useState} from "react";
import {IMessage, ParseMode, SaveMode, Status} from "./types";
import {useApi} from "../../../hooks/useApi";
import {useNavigate, useParams} from "react-router-dom";
import useIsMounted from "../../../hooks/useIsMounted";
import moment, {Moment} from "moment";
import {errorAlert, successAlert} from "../../../utils/alerts";
import {useTranslation} from "react-i18next";
import {IFileResponse, IFileToUpload} from "../../inputs/ImageInput/types";

const useMessageState = () => {

    const api = useApi();

    const {t} = useTranslation();

    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [message, setMessage] = useState<IMessage>({
        name: "",
        body: "",
        status: Status.Draft,
        parse_mode: ParseMode.MD,
    });
    const [saving, setSaving] = useState(false);
    const [saveMode, setSaveMode] = useState<SaveMode>(SaveMode.Draft);
    const [adminIds, setAdminIds] = useState<Array<string | number>>([]);
    const [uploadedFiles, setUploadedFiles] = useState<Array<IFileResponse>>([]);
    const [filesToUpload, setFilesToUpload] = useState<Array<IFileToUpload>>();

    const {isMounted} = useIsMounted();

    useEffect(() => {
        getMessage();
    }, [id]);

    useEffect(() => {
        setMessage({
            ...message,
            attachments_ids: uploadedFiles.map(file => file.id),
        })
    }, [uploadedFiles])

    const getMessage = async () => {
        if (!id) return;

        const response = await api.getOne<IMessage>(`messages`, id);

        if (!response?.data || !isMounted) return;

        setMessage({
            ...response.data,
            run_at: response.data.run_at ? moment(response.data.run_at) : undefined
        });

        if (response.data.status === Status.Planned && !!response.data.run_at) {
            setSaveMode(SaveMode.Planned);
        }

        if (!!response.data.attachments_ids?.length) {
            getAttachments(response.data.attachments_ids);
        }
    }

    const getAttachments = async (ids: Array<number>) => {
        if (!ids.length) {
            return;
        }

        const attachmentsResponse = await api
            .getMany<{ data: Array<IFileResponse> }>("attachments", {
                paginate: 0,
                filter: {
                    ids: ids,
                }
            })

        setUploadedFiles(attachmentsResponse?.data.data.sort((a, b) => {

            const indexA = ids.indexOf(a.id);
            const indexB = ids.indexOf(b.id);

            return indexA - indexB;

        }) || []);
    }

    const prepareFormData = (): FormData => {
        let formData = new FormData();

        formData.append("message", JSON.stringify(message));
        formData.append("admin_ids", JSON.stringify(adminIds));
        formData.append("save_mode", saveMode);

        if (!!filesToUpload?.length) {
            filesToUpload.forEach(file => {
                formData.append("files[]", file.file);
            })
        }

        if (message.id) {
            formData.append("_method", "put");
        }

        return formData;
    };

    const handleSaveClick = async () => {
        if (saving) return;

        if (saveMode === SaveMode.Publish && !confirm(t("messages.publishConfirm"))) {
            return;
        }

        if (saveMode === SaveMode.Test && !adminIds.length) {
            errorAlert(t("errors.adminNotDefined"))
            return;
        }

        if (saveMode === SaveMode.Planned && !message.run_at) {
            errorAlert(t("errors.timeNotDefined"))
            return;
        }

        setSaving(true);

        api
            .request<{ data: IMessage }>({
                endpoint: !message.id ? "messages" : `messages/${message.id}`,
                method: "post",
                config: {
                    data: prepareFormData(),
                    headers: {"Content-Type": "multipart/form-data"},
                }
            })
            .then(response => {
                successAlert(t("messages.saveSuccess"));

                if (!message.id && response.data.data.id) {
                    navigate(`/messages/${response.data.data.id}`);
                } else {
                    setMessage({
                        ...response.data.data,
                        run_at: response.data.data.run_at ? moment(response.data.data.run_at) : undefined
                    });

                    setFilesToUpload(undefined);

                    if (response.data?.data?.attachments_ids) {
                        getAttachments(response.data.data.attachments_ids);
                    }
                }
            })
            .finally(() => {
                if (isMounted) {
                    setSaving(false);
                }
            })
    }

    const handleSaveModeClick = (e: React.MouseEvent) => {

        // @ts-ignore
        if (e.currentTarget?.dataset.value) {
            // @ts-ignore
            setSaveMode(e.currentTarget.dataset.value as SaveMode);
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage({
            ...message,
            name: e.target.value || ""
        });
    };

    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage({
            ...message,
            body: e.target.value || ""
        });
    };

    const handleParseModeChange = (e: React.MouseEvent) => {
        // @ts-ignore
        if (e.currentTarget?.dataset.value) {
            setMessage({
                ...message,
                // @ts-ignore
                parse_mode: e.currentTarget.dataset.value as ParseMode
            });
        }
    }

    const handleAdminIdsChange = (value: Array<string | number>) => {
        setAdminIds(value);
    }

    const handleChangeRunAt = (date: Moment | string) => {
        setMessage({
            ...message,
            run_at: date
        })
    }

    const handleFilesToUploadChange = (files: Array<IFileToUpload>) => {
        setFilesToUpload([
            ...(filesToUpload ? filesToUpload : []),
            ...files,
        ])
    }

    const handleFileToUploadDeleteClick = (id: string) => {
        setFilesToUpload(filesToUpload?.filter(file => file.id !== id))
    }

    const handleUploadedFileDeleteCLick = (id: string) => {
        setUploadedFiles(uploadedFiles.filter(file => file.id.toString() !== id));
        setMessage({
            ...message,
            attachments_ids: message.attachments_ids?.filter(attachmentId => attachmentId.toString() !== id)
        })
    }

    return {
        message,
        saving,
        saveMode,
        adminIds,
        uploadedFiles,
        filesToUpload,
        handleSaveClick,
        handleSaveModeClick,
        handleNameChange,
        handleBodyChange,
        handleParseModeChange,
        handleAdminIdsChange,
        handleChangeRunAt,
        handleFilesToUploadChange,
        setUploadedFiles,
        handleFileToUploadDeleteClick,
        handleUploadedFileDeleteCLick,
    }
};

export default useMessageState;
