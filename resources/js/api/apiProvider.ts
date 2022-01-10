import {IApiProvider, ICreateRequest, Response} from "../types/api";
import axios from "axios";
import {stringify} from 'query-string';
import {API_PREFIX} from "../constants";
import {store} from "../app";
import {getErrorResponseMessages} from "../utils/errors";
import {profileFail} from "../store/actions/adminActions";
import {createSuccessAlert, deleteSuccessAlert, saveSuccessAlert, showAlerts} from "../utils/alerts";
import {setNotFound} from "../store/actions/appActions";

const ApiProvider: IApiProvider = {
    getOne: <T>(resource, id) => {
        return axios
            .get(`${API_PREFIX}/${resource}/${id}`)
            .then(response => Promise.resolve(response.data))
            .catch(e => {
                errorsHandler(e);
            });
    },
    getMany: <T>(resource, data) => {

        let params = "";

        if (data) {
            const query = {
                page: JSON.stringify(data.page),
                perPage: JSON.stringify(data.perPage),
                sort: JSON.stringify(data.sort),
                filter: JSON.stringify(data.filter),
                paginate: JSON.stringify(data.paginate),
            };

            params = `?${stringify(query)}`;
        }

        return axios
            .get(`${API_PREFIX}/${resource}${params}`)
            .then((response: Response) => Promise.resolve(response))
            .catch(e => {errorsHandler(e);});
    },
    update: (resource, data) => {
        return axios
            .put(`${API_PREFIX}/${resource}/${data.id}`, {...data.data})
            .then(response => {
                saveSuccessAlert();
                return Promise.resolve(response.data)
            })
            .catch(e => errorsHandler(e));
    },
    create: <T>(resource: string, data?: ICreateRequest) => {

        // let formData = new FormData();
        //
        // if (data?.data) {
        //     Object.entries(data.data).forEach(entry => {
        //         if (Array.isArray(entry[1])) {
        //             entry[1].forEach(value => {
        //                 formData.append(`${entry[0]}[]`, value)
        //             })
        //         } else {
        //             formData.append(entry[0], entry[1] as string);
        //         }
        //     })
        // }
        //
        // if (data?.files) {
        //     data.files.forEach(file => {
        //         formData.append("files[]", file);
        //     })
        // }

        return axios
            .post(`${API_PREFIX}/${resource}`, data?.data)
            .then(response => {
                createSuccessAlert();
                return Promise.resolve(response.data);
            })
            .catch(e => errorsHandler(e));
    },
    delete: (resource, id) => {
        return axios
            .delete(`${API_PREFIX}/${resource}/${id}`)
            .then(response => {
                deleteSuccessAlert();
                return Promise.resolve(response.data)
            })
            .catch(e => errorsHandler(e));
    },
    deleteMany: (resource, ids) => {
        const queryStr = `/destroyMany`;
        return axios
            .delete(`${API_PREFIX}/${resource}${queryStr}`, {data: {ids}})
            .then(response => {
                deleteSuccessAlert();
                return Promise.resolve(response.data);
            })
            .catch(e => errorsHandler(e));
    },
    refreshCsrf: () => {
        return axios
            .get(`${API_PREFIX}/refresh-csrf`)
            .then(response => {
                if (response.data) {
                    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data
                }
            })
            .catch(e => errorsHandler(e))
    },
    request: ({url, endpoint, method, config}) => {
        const requestUrl = url ? url : `${API_PREFIX}/${endpoint}`;

        if (!requestUrl) return Promise.reject();

        return axios
            .request({
                method: method,
                url: requestUrl,
                ...config
            })
            .then((response: Response) => Promise.resolve(response))
            .catch(e => errorsHandler(e))
    }
};

const errorsHandler = (e: any) => {
    if (e.response.status === 401) {
        store.dispatch(profileFail());
    } else if (e.response.status === 404) {
        store.dispatch(setNotFound(true));
    } else {
        showAlerts(getErrorResponseMessages(e));
    }
    throw e;
};

export default ApiProvider;
