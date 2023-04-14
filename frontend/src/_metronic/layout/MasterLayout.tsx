import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {AsideCustom} from '../../app/components/AsideMenu/AsideCustom';
import {Footer} from './components/Footer'
import {HeaderWrapper} from './components/header/HeaderWrapper'
import {Content} from './components/Content'
import {PageDataProvider} from './core'
import {useLocation} from 'react-router-dom'
import {
  ThemeModeProvider,
} from '../partials'
import {MenuComponent} from '../assets/ts/components'

const MasterLayout = () => {
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <div className='page d-flex flex-row flex-column-fluid'>
          <AsideCustom />
          <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
            <HeaderWrapper />
            <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
              <div className='post d-flex flex-column-fluid' id='kt_post'>
                <Content>


                  <Outlet />


                </Content>
              </div>
            </div>
            <Footer />
          </div>
        </div>



        {/* begin:: Modals */}
        {/*<InviteUsers />
        <UpgradePlan />*/}
        {/* end:: Modals */}
        {/*<ScrollTop />*/}
      </ThemeModeProvider>
    </PageDataProvider>
  )
}

export {MasterLayout}
