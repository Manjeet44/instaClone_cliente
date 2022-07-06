import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import './RegisterForm.scss';
import {useFormik} from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import {toast} from 'react-toastify';

//Mutations
import { REGISTER_USER } from '../../../gql/user';

export default function RegisterForm(props) {
  const {setShowLogin} = props;
  const [register] = useMutation(REGISTER_USER);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required('El Nombre es Obligatorio'),
      username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacios").required('El Nombre de Usuario es Obligatorio'),
      email: Yup.string().email('El Email no es valido').required('El Email es Obligatorio'),
      password: Yup.string().required('El Password es obligatorio').oneOf([Yup.ref('repetirpassword')], 'El Password no coincide'),
      repetirpassword: Yup.string().required('El Password es obligatorio').oneOf([Yup.ref('password')], 'El Password no coincide')
      
    }),
    onSubmit: async formData => {
      try {
        const newUser = formData;
        delete newUser.repetirpassword;
        await register({
          variables: {
            input: newUser          
          }
        });
        toast.success('Usuario Registrado Correctamente');
        setTimeout(() => {
          setShowLogin(true);
        }, 2000)
      } catch (error) {
        toast.error(error.message)
      }
    }
  })
  
  return (
    <>
      <h2 className='register-form-title'>Registrate para ver fotos y videos de tus amigos</h2>
      <Form className='register-form' onSubmit={formik.handleSubmit}>
        <Form.Input 
          type='text'
          placeholder='Nombre y Apellidos'
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
        />

        <Form.Input 
          type='text'
          placeholder='Nombre de Usuario'
          name='username'
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />

        <Form.Input 
          type='text'
          placeholder='Correo Electronico'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />

        <Form.Input 
          type='password'
          placeholder='Escribe tu Password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />

        <Form.Input 
          type='password'
          placeholder='Repite tu Password'
          name='repetirpassword'
          value={formik.values.repetirpassword}
          onChange={formik.handleChange}
          error={formik.errors.repetirpassword}
        />

        <Button type='submit' className='btn-submit'>Registrarse</Button>

      </Form>
    
    </>
  )
}

function initialValues() {
  return {
    name: '',
    username: '',
    email: '',
    password: '',
    repetirpassword: ''
  }
}
