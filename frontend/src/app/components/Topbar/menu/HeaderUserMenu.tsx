/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAuth } from './../../../../app/modules/auth';
import {ChangePhoto} from "./ChangePhoto";

export function HeaderUserMenu()  {
  const {logout} = useAuth();

  return (
    <div
      className='custom-menu menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6'
      data-kt-menu='true'
    >
      <div className='menu-item px-5'>


        <ChangePhoto/>


        <a onClick={logout} className='menu-link px-5 text-danger bg-hover-light-danger'>
          Выйти
        </a>
      </div>
    </div>
  );
}