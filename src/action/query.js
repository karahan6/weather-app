/* eslint-disable no-unused-expressions */
import {getRequest, postRequest} from "../request";
import {CLEAR_QUERIES, CLEAR_QUERY, QUERY, REQUEST_FAILED, UPDATE_SNACK, UPDATE_SPIN} from "../constants";
import SnackType from "../model/SnackType";
import { requestUrls } from "../constants/requestUrls";

export const getQuery = (getQueryInput) => dispatch =>
    new Promise((resolve, reject) => {
        let {requestName, saveToStore, requestParams, pathVars, callBackPrepare, spin, storeName} = getQueryInput;
        let url = requestUrls[requestName];
        pathVars ? pathVars.forEach(variable => url = url + "/" + variable) : null;
        spin ? dispatch({type: UPDATE_SPIN, spin: spin}) : null;
        getRequest(url, requestParams)
            .then(res => {
                saveToStore ?
                    dispatch({
                        type: QUERY,
                        addition: {[storeName ? storeName : requestName]: (callBackPrepare ? callBackPrepare(res.data) : res.data)}
                    }) : null;
                spin ? dispatch({type: UPDATE_SPIN, spin: false}) : null;
                resolve(res);
            })
            .catch(err => {
                notifyError(err);
                spin ? dispatch({type: UPDATE_SPIN, spin: false}) : null;
                reject(err);
            })
    });

export const postQuery = (postQueryInput) => dispatch =>
    new Promise((resolve, reject) => {
        let {requestName, saveToStore, requestParams, pathVars, callBackPrepare, spin, storeName, data} = postQueryInput;
        let url = requestUrls[requestName];
        pathVars ? pathVars.forEach(variable => url = url + "/" + variable) : null;
        spin ? dispatch({type: UPDATE_SPIN, spin: spin}) : null;
        postRequest(url, data, requestParams)
            .then(res => {
                saveToStore ?
                    dispatch({
                        type: QUERY,
                        addition: {[storeName ? storeName : requestName]: (callBackPrepare ? callBackPrepare(res.data) : res.data)}
                    }) : null;
                spin ? dispatch({type: UPDATE_SPIN, spin: false}) : null;
                resolve(res);
            })
            .catch(err => {
                notifyError(err);
                spin ? dispatch({type: UPDATE_SPIN, spin: false}) : null;
                reject(err);
            })
    });

export const clearQueries = () => {
    return {type: CLEAR_QUERIES}
};

export const clearQuery = (queryName) => {
    return {type: CLEAR_QUERY, queryName: queryName}
};

const notifyError = (err) => dispatch => {
    if (err && err.response && err.response.data && err.response.data.Message)
        dispatch({type: UPDATE_SNACK, snack:{type:SnackType.ERROR, message: err.response.data.Message}});
    else
        dispatch({type: UPDATE_SNACK, snack:{type:SnackType.ERROR, message: REQUEST_FAILED}});
};
