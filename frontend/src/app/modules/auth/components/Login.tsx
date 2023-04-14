/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {useFormik} from 'formik';
import {getUserByToken, login, loginByToken} from '../core/_requests';
import {useAuth} from '../core/Auth';
import qs from 'qs';
import {useActions} from "../../../hooks/actions";
import {wsStart} from "../ws";
import {useAppDispatch} from "../../../store/hook";
import {useDispatch} from "react-redux";


const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const {setUser, initChat} = useActions()
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: user} = await login(values.email, values.password)


        saveAuth(user)

        wsStart(user.ws)

        setUser(user)
        setCurrentUser(user)

      } catch (error: any) {
        saveAuth(undefined)
        setLoading(false)
        setSubmitting(false)

        if(error.response.status === 420){
          setStatus(error.response.data.message.message)
        }else {
          setStatus('Ошибка сервера')
        }

      }
    },
  })

  const onLoginByToken = async (token: string) => {
    const {data: auth} = await loginByToken(token)
    saveAuth(auth)
    const {data: user} = await getUserByToken(auth.api_token)
    setCurrentUser(user)
  }

  let params = qs.parse(document.location.search.slice(1))
  if(params['token']){
    onLoginByToken(String(params['token']))
  }


  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >



      {formik.status && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
      ) }


      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Почта</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',

          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Пароль</label>
            {/* end::Label */}
            {/* begin::Link */}
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              Забыли пароль ?
            </Link>
            {/* end::Link */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid'
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Войти</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>


      </div>
      {/* end::Action */}
    </form>
  )
}
