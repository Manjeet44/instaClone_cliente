import { gql } from "@apollo/client";

export const NEW_PUBLISH = gql`
    mutation publish($file: Upload) {
        publish(file: $file) {
            status
            urlFile
        }
    }
`;

//Anar alerta amb es nom des mutation si el tenim diferent que es nom des controlador des mutation.

export const GET_PUBLICATIONS = gql`
    query getPublications($username: String!) {
        getPublications(username: $username) {
            id
            idUser
            file
            typeFile
        }
    }
`;

export const GET_PUBLICATIONS_FOLLOWEDS = gql`
query getPublicationsFolloweds {
    getPublicationsFolloweds{
        id
        idUser {
            name
            username
            avatar
        }
        file
        typeFile
        createAt
        }
    }
`;