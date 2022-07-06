import React, {useCallback} from 'react';
import { Button } from 'semantic-ui-react';
import {useDropzone} from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR } from '../../../gql/user';
import './AvatarForm.scss';

export default function AvatarForm({setShowModal}) {
  const [updateAvatar] = useMutation(UPDATE_AVATAR);

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    try {
      console.log(file)
      const result = await updateAvatar({variables: {file}});
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }, []);

  const {getRootProps, getInputProps} = useDropzone({
      accept: "image/jpeg, image/png",
      noKeyboard: true,
      multiple: false,
      onDrop
  })
  return (
    <div className='avatar-form'>
        <Button {...getRootProps()}>Cargar Foto</Button>
        <Button>Eliminar Foto Actual</Button>
        <Button onClick={() => setShowModal(false) }>Cancelar</Button>
        <input {...getInputProps()} />
    </div>
  )
}
