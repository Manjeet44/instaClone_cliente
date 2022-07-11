import React from 'react';
import { Grid } from 'semantic-ui-react';
import PreviewPublication from './PreviewPublication/PreviewPublication';
import './Publications.scss';

export default function Publications({getPublications}) {

  return (
    <div className='publications'>
        <h1>Publicaciones</h1>
        <Grid columns={4}>
            {getPublications.map((publication, index) => (
                <Grid.Column key={index}>
                    <PreviewPublication publication={publication} />
                </Grid.Column>
            ))}
        </Grid>
    </div>
  )
}
