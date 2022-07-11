import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../components/User/Profile/Profile';
import Publications from '../components/Publications/Publications';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS } from '../gql/publication';

export default function User() {
  const {username} = useParams();
  const {data, loading} = useQuery(GET_PUBLICATIONS, {
    variables: {username}
  });

  if(loading) return null;
  const {getPublications} = data;
  const totalPublications = getPublications?.length;
  console.log(totalPublications);



  return (
    <>
        <Profile username={username} totalPublications={totalPublications} />
        <Publications getPublications={getPublications} />
    </>
  )
}
