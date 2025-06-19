import i18n from '@/i18n';
import moment from 'moment';
export function getAllowedRoutes(routes: any, user: any) {
  const userInfo: any = localStorage?.getItem('_DICI_AUTH')
    ? JSON.parse(localStorage?.getItem('_DICI_AUTH') || '')
    : '';
  return routes.filter((route: any) => {
    if (!route?.permissions) {
      return true;
    } else {
      return userInfo?.role?.permissions?.find(
        (item: any) =>
          item?.name === route?.permissions?.ressource &&
          item?.access[route?.permissions?.action],
      );
    }
  });
}

export const showingTranslateValue = (data: any, lang: any) => {
  const langue = lang == 'fr-FR' ? 'fr' : lang;
  const result = data?.find((item: any) => item.locale === langue);
  if (result) {
    return result;
  } else {
    return null;
  }
};

export const years = (() => {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const yearsArray = [{ label: currentYear, value: currentYear }];

  for (let year = startYear; year <= currentYear; year++) {
    yearsArray.push({ label: year, value: year });
  }

  return yearsArray;
})();
export const months = [
  { label: i18n.t('January'), value: 'January' },
  { label: i18n.t('February'), value: 'February' },
  { label: i18n.t('March'), value: 'March' },
  { label: i18n.t('April'), value: 'April' },
  { label: i18n.t('May'), value: 'May' },
  { label: i18n.t('June'), value: 'June' },
  { label: i18n.t('July'), value: 'July' },
  { label: i18n.t('August'), value: 'August' },
  { label: i18n.t('September'), value: 'September' },
  { label: i18n.t('October'), value: 'October' },
  { label: i18n.t('November'), value: 'November' },
  { label: i18n.t('December'), value: 'December' },
];

export const getEditors = [
  { label: i18n.t('Bureau de Goma'), value: 'Bureau de Goma' },
  { label: i18n.t('Bureau de Kinshasa'), value: 'Bureau de Kinshasa' },
];
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
export function checkPermission(ressource: any, access: string) {
  const userData = localStorage.getItem('_DICI_AUTH');
  if (userData) {
    const user: any = JSON.parse(userData);
    return user?.permissions?.find(
      (item: any) => item?.name === ressource && item?.access[access],
    );
  }
}

export const date_format = (data: any) => {
  return moment(data).format('DD/MM/YYYY');
};
//export const BASE_URL = 'http://localhost:8000/api'
export const BASE_URL = 'https://apicosamed.cosamed.org/api';
