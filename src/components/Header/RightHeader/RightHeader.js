import React from 'react';
import { Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import userAuth from '../../../hooks/userAuth';
import ImageNoFound from '../../../assets/png/avatar.png';
import './RightHeader.scss';

export default function RightHeader() {
    const {auth} = userAuth();
    const {data, loading, error} = useQuery(GET_USER, {
        variables: {username: auth.username},
    });
    if(loading || error) return null;
    const {getUser} = data;
  return (
    <>
        <div className='right-header'>
            <Link to='/'>
                <Icon name='home' />
            </Link>
            <Link to='/'>
                <Icon name='plus' />
            </Link>
            <Link to={`/${auth.username}`}>
                <Image src={getUser.avatar ? getUser.avatar : ImageNoFound} avatar />
            </Link>
        </div>
    </>
  )
}
