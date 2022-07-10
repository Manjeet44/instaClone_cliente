import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWERS } from '../../../../gql/follow';
import { GET_FOLLOWEDS } from '../../../../gql/follow';
import ModalBasic from '../../../Modal/ModalBasic/ModalBasic';
import ListUsers from '../../ListUsers/ListUsers';
import './Followers.scss';

export default function Followers({username}) {

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [childrenModal, setChildrenModal] = useState(null);

  const {data: dataFollowers, loading: loadingFollowers, startPolling: startPollingFollowers , stopPolling: stopPollingFollowers} = useQuery(GET_FOLLOWERS, {
    variables: {username}
  });

  const {data: dataFolloweds, loading: loadingFolloweds, startPolling: startPollingFolloweds , stopPolling: stopPollingFolloweds} = useQuery(GET_FOLLOWEDS, {
    variables: {username}
  })

  useEffect(() => {
    startPollingFollowers(1000);
    return () => {
      stopPollingFollowers()
    }
  }, [startPollingFollowers, stopPollingFollowers]) //Servidor sufre un poco

  useEffect(() => {
    startPollingFolloweds(1000);
    return () => {
      stopPollingFolloweds()
    }
  }, [startPollingFolloweds, stopPollingFolloweds]) //Servidor sufre un poco

  const openFollowers = () => {
    setTitleModal('Seguidores');
    setChildrenModal(<ListUsers users={dataFollowers.getFollowers} setShowModal={setShowModal} />);
    setShowModal(true);

  }
  const openFolloweds = () => {
    setTitleModal('Usuarios Seguidos');
    setChildrenModal(<ListUsers users={dataFolloweds.getFolloweds} setShowModal={setShowModal} />);
    setShowModal(true);

  }

  if(loadingFollowers || loadingFolloweds) return null;

  const seguidores = dataFollowers.getFollowers.length;
  const seguidos = dataFolloweds.getFolloweds.length;
  

  return (
    <>
      <div className='followers'>
          <p><span>**</span> Publicaciones</p>
          <p className='link' onClick={openFollowers}><span>{seguidores}</span> Seguidores</p>
          <p className='link' onClick={openFolloweds}><span>{seguidos}</span> Seguidos</p>
      </div>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  )
}
