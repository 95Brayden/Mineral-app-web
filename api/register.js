import request from '@/utils/requestUtil'

export function memberRegister(data) {
	return request({
		method: 'POST',
		url: '/sso/register',
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
		},
		data: data
	})
}

export function memberInfo() {
	return request({
		method: 'GET',
		url: '/sso/info'
	})
}
