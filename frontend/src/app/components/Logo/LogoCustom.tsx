import { Link } from 'react-router-dom';

export function LogoCustom() {
    return (
        <div className='logo-custom d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to='/dashboard' className='d-lg-none'>
                Kooperatiff
            </Link>
        </div>
    );
}