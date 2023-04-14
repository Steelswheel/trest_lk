/* eslint-disable react/jsx-no-target-blank */
import { AsideMenuItem } from './AsideMenuItem'

export function AsideMenuMain() {
    return (
        <>
            <AsideMenuItem
                to='/dashboard'
                title='Главная'
                fontIcon='fa-solid fa-chart-column'
            />
            <AsideMenuItem
                to='/chat'
                title='Чат'
                fontIcon='fa-solid fa-comments'
            />
            <AsideMenuItem
                to='/edz'
                title='Займы'
                fontIcon='fa-solid fa-money-bill'
            />
            <AsideMenuItem
                to='/eds'
                title='Сбережения'
                fontIcon='fa-solid fa-credit-card'
            />
            <AsideMenuItem
                to='/design'
                title='Заказать макет'
                fontIcon='fa-solid fa-paintbrush'
            />
            <AsideMenuItem
                to='/docs'
                title='Управляющие документы'
                fontIcon='fa-solid fa-file'
            />
            <AsideMenuItem
                to='/schedule'
                title='Регламент работы'
                fontIcon='fa-solid fa-briefcase'
            />
            <AsideMenuItem
                to='/news'
                title='Новости'
                fontIcon='fa-solid fa-newspaper'
            />
        </>
    )
}
