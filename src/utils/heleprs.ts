import moment from "moment"
export function getAllowedRoutes(routes: any, user: any) {
	const userInfo: any = localStorage?.getItem('_DICI_AUTH')
		? JSON.parse(localStorage?.getItem('_DICI_AUTH') || '')
		: ''
	return routes.filter((route: any) => {
		if (!route?.permissions) {
			return true
		} else {
			return userInfo?.role?.permissions?.find(
				(item: any) =>
					item?.name === route?.permissions?.ressource &&
					item?.access[route?.permissions?.action]
			)
		}
	})
}

export const showingTranslateValue = (data: any, lang: any) => {
	const langue = lang == 'fr-FR' ? 'fr' : lang
	const result = data?.find((item: any) => item.locale === langue)
	if (result) {
		return result
	} else {
		return null
	}
}

export function checkPermission(ressource: any, access: string) {
	const userData = localStorage.getItem('_DICI_AUTH')
	if (userData) {
		const user: any = JSON.parse(userData)
		return user?.permissions?.find(
			(item: any) => item?.name === ressource && item?.access[access]
		)
	}
}

export const date_format = (data:any) => {
	return moment(data).format('DD/MM/YYYY')
}
//export const BASE_URL = 'http://localhost:8000/api'
export const BASE_URL = "https://apicosamed.cosamed.org/api";
