import {FC} from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router';
import {checkIsActive, WithChildren} from '../../../_metronic/helpers';

type Props = {
  to: string
  title: string
  fontIcon?: string
  hasBullet?: boolean
}

const AsideMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  fontIcon,
  hasBullet = false,
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)

  return (
    <div className='menu-item'>
      <Link className={clsx('menu-link without-sub', {active: isActive})} to={to}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        <i className={fontIcon}></i>
        <span className='menu-title'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}