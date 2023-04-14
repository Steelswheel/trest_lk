/* eslint-disable react/jsx-no-target-blank */
import { AsideMenuItem } from './AsideMenuItem'

export function AsideMenuMain() {
    return (
        <>
            <AsideMenuItem
                to='/dashboard'
                icon='/media/icons/duotune/art/art002.svg'
                title='Главная'
                fontIcon='bi-app-indicator'
            />
            {/* <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Страницы</span>
                </div>
            </div> */}
            <AsideMenuItem
                to='/chat'
                icon='/media/icons/duotune/communication/com007.svg'
                title='Чат'
                fontIcon='bi-layers'
            />
            <AsideMenuItem
                to='/edz'
                icon='/media/icons/duotune/finance/fin003.svg'
                title='Займы'
                fontIcon='bi-layers'
            />
            <AsideMenuItem
                to='/eds'
                icon='/media/icons/duotune/finance/fin005.svg'
                title='Сбережения'
                fontIcon='bi-layers'
            />
            <AsideMenuItem
                to='/design'
                icon='/media/icons/duotune/art/art003.svg'
                title='Заказать макет'
                fontIcon='bi-layers'
            />
            <AsideMenuItem
                to='/docs'
                icon='/media/icons/duotune/coding/cod002.svg'
                title='Управляющие документы'
                fontIcon='bi-layers'
            />
            <AsideMenuItem
                to='/schedule'
                icon='/media/icons/duotune/communication/com014.svg'
                title='Регламент работы'
                fontIcon='bi-layers'
            />
            <AsideMenuItem
                to='/news'
                icon='/media/icons/duotune/abstract/abs015.svg'
                title='Новости'
                fontIcon='bi-layers'
            />
        </>
    )
}
