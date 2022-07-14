import React from 'react';
import {Grid} from 'semantic-ui-react';
//import userAuth from '../../hooks/userAuth';
import './Home.scss';

export default function Home() {
    //const auth = userAuth();
  return (
    <Grid className='home'>
      <Grid.Column className='home__left' width={11}>
        <h2>Feed</h2>
      </Grid.Column>

      <Grid.Column className='home__right' width={5}>
        <h2>Usarios no Seguidos</h2>
      </Grid.Column>
    </Grid>
  )
}
