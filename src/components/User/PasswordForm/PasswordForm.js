import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import './PasswordForm.scss';

export default function PasswordForm({logout}) {
    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: ''
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string().required().oneOf([Yup.ref('repeatNewPassword')]),
            repeatNewPassword: Yup.string().required().oneOf([Yup.ref('newPassword')])
        }),
        onSubmit: async (formData) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            currentPassword: formData.currentPassword,
                            newPassword: formData.newPassword
                        }
                    }
                });
                if(!result.data.updateUser) {
                    toast.error('Error al Cambiar el Password');
                } else {
                    logout();
                }
            } catch (error) {
                toast.error('Error al Cambiar el Password');
                console.log(error)
            }
        }
    })
  return (
    <Form className='password-form' onSubmit={formik.handleSubmit}>
        
        <Form.Input 
            placeholder='Password Actual'
            name='currentPassword'
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            error={formik.errors.currentPassword && true}
            type='password'
        />

        <Form.Input 
            placeholder='Nueva Password'
            name='newPassword'
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.errors.newPassword && true}
            type='password'
        />

        <Form.Input 
            placeholder='Repetir Nueva Password'
            name='repeatNewPassword'
            value={formik.values.repeatNewPassword}
            onChange={formik.handleChange}
            error={formik.errors.repeatNewPassword && true}
            type='password'
        />

        <Button type='submit' className='btn-submit'>Actualizar</Button>
    </Form>
  )
}
