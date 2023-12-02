export function getAllowedRoutes(routes: any, user: any) {
	let userInfo: any = localStorage?.getItem('_DICI_AUTH')
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
	let langue = lang == 'fr-FR' ? 'fr' : lang
	let result = data?.find((item: any) => item.locale === langue)
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
export const BASE_URL = 'http://localhost:8000/api'
//export const BASE_URLL = "https://apidici.wafrisystem.com/api";
