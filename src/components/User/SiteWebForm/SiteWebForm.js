import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import './SiteWebForm.scss';

export default function SiteWebForm({setShowModal, currentSiteWeb, refetch}) {
    const [updateUser] = useMutation(UPDATE_USER);
    const formik = useFormik({
        initialValues: {
            siteWeb: currentSiteWeb || ''
        },
        validationSchema: Yup.object({
            siteWeb: Yup.string().required()
        }),
        onSubmit: async (formData) => {
            try {
                await updateUser({
                    variables: {
                        input: formData
                    }
                });
                refetch();
                setShowModal(false);
            } catch (error) {
                toast.error('Error al actualizar tu sitio web')
                console.log(error)
            }
        }
    })
  return (
    <Form className='site-web-form' onSubmit={formik.handleSubmit}>
        <Form.Input
            placeholder='Tu pagina Web'
            value={formik.values.siteWeb}
            onChange={formik.handleChange}
            error={formik.errors.siteWeb && true}
            name='siteWeb'
        />
        <Button type='submit' className='btn-submit'>Actualizar</Button>
    </Form>
  )
}
