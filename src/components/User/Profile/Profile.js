import React, {useState} from 'react';
import {Image, Grid} from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import userAuth from '../../../hooks/userAuth';
import UserNotFound from '../../UserNotFound/UserNotFound';
import ModalBasic from '../../Modal/ModalBasic/ModalBasic';
import AvatarForm from '../AvatarForm/AvatarForm';
import './Profile.scss';

//Images
import ImageNoFound from '../../../assets/png/avatar.png';

export default function Profile({username}) {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [childrenModal, setChildrenModal] = useState(null);
  const {auth} = userAuth();
  const {data, loading, error} = useQuery(GET_USER, {
      variables: {username},
  });
    
    if(loading) return null;
    if(error)  return <UserNotFound/> ;
    const {getUser} = data;

    const handleModal = (type) => {
      switch (type) {
        case 'avatar':
          setTitleModal('Cambiar Foto de Perfil');
          setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth} />);
          setShowModal(true);
          break;
      
        default:
          break;
      }
    }
  return (
    <>
      <Grid className='profile'>

        <Grid.Column width={5} className="profile__left">
          <Image
            src={getUser.avatar ? getUser.avatar : ImageNoFound} 
            avatar
            onClick={() => username === auth.username && handleModal('avatar')}
          />
        </Grid.Column>

        <Grid.Column width={11} className="profile__right">
          <div>HeaderProfile</div>
          <div>Followers</div>
          <div className='other'>
            <p className='name'>{getUser.name}</p>
            {getUser.siteWeb && (
              <a href={getUser.siteWeb} className='siteWeb' target='_blank'>{getUser.siteWeb}</a>
            )}
            {getUser.description && (
              <p className='description'>{getUser.description}</p>
            )}
          </div>
        </Grid.Column>

      </Grid>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  )
}
