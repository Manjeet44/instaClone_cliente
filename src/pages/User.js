import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../components/User/Profile/Profile';
import Publications from '../components/Publications/Publications';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS } from '../gql/publication';

export default function User() {
  const {username} = useParams();

  const {data, loading, startPolling, stopPolling} = useQuery(GET_PUBLICATIONS, {
    variables: {username}
  });

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    }
  }, [startPolling, stopPolling])
  

  if(loading) return null;
  const {getPublications} = data;
  const totalPublications = getPublications?.length;



  return (
    <>
        <Profile username={username} totalPublications={totalPublications} />
        <Publications getPublications={getPublications} />
    </>
  )
}
