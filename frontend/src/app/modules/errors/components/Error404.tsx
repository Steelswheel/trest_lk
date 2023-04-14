import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

export function Error404 ({linkTo = '', linkText = ''}) {
  return (
    <div className='d-flex flex-column flex-root'>
      <div className='d-flex flex-column flex-center flex-column-fluid p-10'>
        {/* begin::Illustration */}
        <img
          src={toAbsoluteUrl('/media/illustrations/sketchy-1/18.png')}
          alt=''
          className='mw-100 mb-10 h-lg-450px'
        />
        {/* end::Illustration */}
        {/* begin::Message */}
        <h1 className='fw-bold mb-10' style={{color: '#A3A3C7'}}>
          Страница не существует!
        </h1>
        {/* end::Message */}
        {/* begin::Link */}
        <Link to={linkTo ? linkTo : '/dashboard'} className='btn btn-primary'>
          {linkText ? linkText : 'На главную'}
        </Link>
        {/* end::Link */}
      </div>
    </div>
  )
}