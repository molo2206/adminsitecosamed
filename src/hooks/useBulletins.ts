import { useAuthContext } from '@/common';
import BulletinsServices from '@/services/BulletinsService';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const useBulletins = () => {
  const {
    errorNotification,
    successNotification,
    closeModal,
    forceUpdate,
    setIsEdit,
    setSelected,
    pageLang,
    setImage,
    setImageUrl,
  } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const location = useLocation();

  const createBulletins = (body: any) => {
    setLoading(true);

    const formdata = new FormData();
    formdata.append('title', body?.title);
    formdata.append('description', body?.description);
    formdata.append('author', body?.author);
    formdata.append('locale', pageLang);
    formdata.append('year', body?.year);
    formdata.append('month', body?.month);
    formdata.append('created', body?.created);
    formdata.append('editor', body?.editor);
    formdata.append('page_number', body?.page_number);
    formdata.append('size', body?.size);

    if (body?.image) {
      formdata.append('image', body?.image);
    }
    if (body?.file) {
      formdata.append('file', body?.file);
    }

    if (location.pathname === `/bulletins/edit/${location.pathname.split('/')[3]}`) {
      BulletinsServices.update(formdata, location.pathname.split('/')[3])
        .then((response: any) => {
          setLoading(false);
          if (response?.status === 200) {
            forceUpdate();
            successNotification(response.data.message);
            setIsEdit(false);
            setSelected(null);
            setImage(null);
            setImageUrl(null);
            closeModal();
            navigation('/bulletins/list', { replace: true });
          } else {
            errorNotification(response.message);
          }
        })
        .catch((err) => {
          errorNotification(
            err?.response?.data?.message || err.message || 'Une erreur est survenue',
          );
          setLoading(false);
        });
    }
    if (location.pathname === '/bulletins/create') {
      BulletinsServices.create(formdata)
        .then((response: any) => {
          setLoading(false);
          if (response?.status === 200) {
            forceUpdate();
            successNotification(response.data.message);
            setLoading(false);
            setIsEdit(false);
            setSelected(null);
            setImage(null);
            setImageUrl(null);
            closeModal();
            navigation('/bulletins/list', { replace: true });
          } else {
            errorNotification(response.message);
          }
        })
        .catch((err) => {
          errorNotification(
            err?.response?.data?.message || err.message || 'Une erreur est survenue',
          );

          setLoading(false);
          console.log(err);
        });
    }
  };

  return {
    loading,
    createBulletins,
  };
};

export default useBulletins;
