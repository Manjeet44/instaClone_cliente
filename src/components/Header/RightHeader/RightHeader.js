import React from 'react';
import { Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import userAuth from '../../../hooks/userAuth';
import ImageNoFound from '../../../assets/png/avatar.png';
import './RightHeader.scss';

export default function RightHeader() {
    const {auth} = userAuth();
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
                <Image src={ImageNoFound} avatar />
            </Link>
        </div>
    </>
  )
}
