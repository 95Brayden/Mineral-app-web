import request from '@/utils/requestUtil';

export function addEvaluation(data) {
    return request({
        method: 'POST',
        url: '/evaluation/add',
        data: data
    });
}

export function deleteEvaluation(params) {
    return request({
        method: 'POST',
        url: '/evaluation/delete',
        params: params
    });
}

export function fetchEvaluationList(params) {
    return request({
        method: 'GET',
        url: '/evaluation/list',
        params: params
    });
}

export function getEvaluationDetail(params) {
    return request({
        method: 'GET',
        url: '/evaluation/detail',
        params: params
    });
}

export function clearEvaluation() {
    return request({
        method: 'POST',
        url: '/evaluation/clear'
    });
}
