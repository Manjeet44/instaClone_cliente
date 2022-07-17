import React from 'react';
import {Grid} from 'semantic-ui-react';
import Feed from '../../components/Home/Feed/Feed';
import UserNotFolloweds from '../../components/Home/UsersNotFolloweds/UserNotFolloweds';
//import userAuth from '../../hooks/userAuth';
import './Home.scss';

export default function Home() {
    //const auth = userAuth();
  return (
    <Grid className='home'>
      <Grid.Column className='home__left' width={12}>
        <Feed />
      </Grid.Column>

      <Grid.Column className='home__right' width={4}>
        <UserNotFolloweds/>
      </Grid.Column>
    </Grid>
  )
}
