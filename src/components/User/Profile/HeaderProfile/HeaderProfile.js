import React from 'react';
import { Button } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/client';
import { IS_FOLLOW, FOLLOW_USER, UNFOLLOW } from '../../../../gql/follow';
import './HeaderProfile.scss';

export default function HeaderProfile({username, auth, handleModal}) {
  
  const [followUser] = useMutation(FOLLOW_USER);
  const [unFollow] = useMutation(UNFOLLOW);
  const {data, loading, refetch} = useQuery(IS_FOLLOW, {
    variables: {username}
  });
  
  const onFollowUser = async () => {
    try {
      await followUser({
        variables: {
          username
        }
      });
      refetch();
    } catch (error) {
      console.log(error)
    }
  }

  const onUnFollow = async () => {
    try {
      await unFollow({
        variables: {
          username
        }
      });
      refetch();
    } catch (error) {
      console.log(error)
    }
  }

  const buttonFollow = () => {
    if(data.isFollow) {
      return <Button className='btn-danger' onClick={onUnFollow}>Dejar de Seguir</Button>;

    } else {
      return <Button className='btn-action' onClick={onFollowUser}>Seguir</Button>
    }
  };

  return (
    <div className='header-profile'>
        <h2>{username}</h2>
        {username === auth.username ? (
            <Button onClick={() => handleModal('settings')}>Ajustes</Button>
        ) : (
          !loading && buttonFollow()
        )}
    </div>
  )
}
