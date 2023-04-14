import { toApiUrl } from './../../../../_metronic/helpers';
import { HeaderUserMenu } from '../menu/HeaderUserMenu';

import { useSelector } from 'react-redux';
import {RootState} from '../../../store/index'
export function User() {

    const currentUser = useSelector((state:RootState) => state.user)

    let avatar = currentUser.img ? currentUser.img : '/lk/frontend/public/media/avatars/blank.png'

    return (
        <div
            className="user d-flex align-items-center"
            id="kt_header_user_menu_toggle"
        >
            <div className="user-name">
                {`${currentUser.first_name} ${currentUser.last_name}`}
            </div>
            <div
                className="user-avatar cursor-pointer"
                data-kt-menu-trigger="click"
                data-kt-menu-attach="parent"
                data-kt-menu-placement="bottom-end"
                data-kt-menu-flip="bottom"
                style={{backgroundImage: `url(${toApiUrl(avatar)})`}}
            >
            </div>

            <HeaderUserMenu />
        </div>
    );
}