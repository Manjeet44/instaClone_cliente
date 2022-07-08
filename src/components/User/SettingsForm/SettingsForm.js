import React from 'react';
import { Button } from 'semantic-ui-react';
import {useNavigate} from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import userAuth from '../../../hooks/userAuth';
import PasswordForm from '../PasswordForm/PasswordForm';
import EmailForm from '../EmailForm/EmailForm';
import DescriptionForm from '../DescriptionForm/DescriptionForm';
import SiteWebForm from '../SiteWebForm/SiteWebForm';
import './SettingsForm.scss';


export default function SettingsForm({setShowModal, setTitleModal, setChildrenModal, getUser, refetch}) {
    const {logout} = userAuth();
    const navigate = useNavigate();
    const client = useApolloClient();

    const onChangePassword = () => {
        setTitleModal('Cambiar Password');
        setChildrenModal(<PasswordForm logout={onLogout}/>);
    }

    const onChangeEmail = () => {
      setTitleModal('Cambiar Email');
      setChildrenModal(<EmailForm setShowModal={setShowModal} currentEmail={getUser.email} refetch={refetch} />);
    }

    const onChangeDescription = () => {
      setTitleModal('Actualizar Bibliografia');
      setChildrenModal(<DescriptionForm setShowModal={setShowModal} currentDescription={getUser.description} refetch={refetch} />);
    }

    const onChangeSiteWeb = () => {
      setTitleModal('Actualizar Pagina Web');
      setChildrenModal(<SiteWebForm setShowModal={setShowModal} currentSiteWeb={getUser.siteWeb} refetch={refetch} />);
    }
    const onLogout = () => {
        client.clearStore(); //Limpiar la cache
        logout(); //Llevar es token de localstorage
        navigate('/'); 
    }
  return (
    <div className='settings-form'>
        <Button onClick={onChangePassword}>Cambiar Password</Button>
        <Button onClick={onChangeEmail}>Cambiar Email</Button>
        <Button onClick={onChangeDescription}>Descripcion</Button>
        <Button onClick={onChangeSiteWeb}>Sitio Web</Button>
        <Button onClick={onLogout}>Cerrar Sesion</Button>
        <Button onClick={() => setShowModal(false)}>Cancelar</Button>

    </div>
  )
}
