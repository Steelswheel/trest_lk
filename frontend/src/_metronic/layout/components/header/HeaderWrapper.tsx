/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx';

import { useLayout } from '../../core';
import { DefaultTitle } from './page-title/DefaultTitle';
import { TopbarCustom } from './../../../../app/components/Topbar/TopbarCustom';
import { LogoCustom } from './../../../../app/components/Logo/LogoCustom';
import { ToggleCustom } from './../../../../app/components/Toggle/ToggleCustom';

export function HeaderWrapper() {
  const {config, classes, attributes} = useLayout()
  const {header, aside} = config

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      <div className='container-fluid d-flex align-items-center justify-content-between shadow-sm'>
        <div>
          <DefaultTitle/>
        </div>

        <div className=" d-flex align-items-stretch justify-content-between" style={{flex: 1}}>
          <div className="d-flex">
            {/* begin::Aside mobile toggle */}
            {aside.display && <ToggleCustom />}
            {/* end::Aside mobile toggle */}
            {/* begin::Logo */}
            <LogoCustom />
            {/* end::Logo */}
          </div>

          {/* begin::Wrapper */}
          <div className='d-flex align-items-stretch justify-content-between'>
            {/* begin::Navbar */}

            {header.left === 'page-title' && (
                <div className='d-flex align-items-center' id='kt_header_nav'>
                  <DefaultTitle />
                </div>
            )}

            <div className='d-flex align-items-stretch flex-shrink-0'>
              <TopbarCustom />
            </div>
          </div>
          {/* end::Wrapper */}
        </div>
      </div>
    </div>
  )
}