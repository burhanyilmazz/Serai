import { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as Yup from 'yup'
import {useFormik} from 'formik'

import {FormInput, FormTextarea, Button, PhoneFormInput } from "../"
import styles from './ContactForm.module.scss';

export const ContactForm = (props) => { 
  const { className } = props;

  const contactSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong format.')
      .required('This field cannot be left blank.'),
    namesurname: Yup.string().required('This field cannot be left blank.'),
  })

  const [contact] = useState({
    namesurname: '',
    email: '',
    phone: '',
    message: '',
  })

  const formik = useFormik({
    initialValues: contact,
    validationSchema: contactSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      console.log(values)
    },
  })
  
  return (
    <>
      <div className={classNames(styles['contact-form'], className)}>
        <h3>Contact Us</h3>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className='form-group'>
            <FormInput 
              field='Full Name'
              required
              errorMessage={formik.errors.namesurname}
              {...formik.getFieldProps('namesurname')}
              className={classNames({'is-invalid': formik.touched.namesurname && formik.errors.namesurname})}
            />
          </div>
          <div className='form-group'>
            <PhoneFormInput 
              field='Phone'
              name='phone'
              required
              onChange={(value) => formik.setFieldValue('phone', value)}
            />
          </div>

          <div className='form-group'>
            <FormInput 
              field='E-Mail'
              type="email" 
              required
              errorMessage={formik.errors.email}
              {...formik.getFieldProps('email')}
              className={classNames({'is-invalid': formik.touched.email && formik.errors.email})}
            />
          </div>
          
          <div className='form-group'>
            <FormTextarea 
              field='Message'
              rows={5}
              name={'message'}
              {...formik.getFieldProps('message')}
            />
          </div>
          <Button text={'Submit'} button className={styles['button']} />
        </form>
      </div>
    </>
  )
}

ContactForm.propTypes = {
	title: PropTypes.string,
  type: PropTypes.string
};