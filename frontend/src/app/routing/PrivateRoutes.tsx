import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import { Dashboard } from '../pages/dashboard/Dashboard';
import { EdzList } from "../pages/edz/EdzList";
import { EdsList } from "../pages/eds/EdsList";
import { EdzRequest } from "../pages/edz/request/EdzRequest";
import { DesignList } from '../pages/design/DesignList';
import { Docs } from '../pages/docs/Docs';
import { Schedule } from '../pages/schedule/Schedule';
import { Chat } from '../pages/chat/Chat';
import { News } from '../pages/news/News';
import { NewsDetail } from '../pages/news/detail/NewsDetail';
import { EdzShow } from "../pages/edz/show/EdzShow";
import { Profile } from "../pages/profile/Profile";
import { Error404 } from "../modules/errors/components/Error404";

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                {/* Redirect to Dashboard after success login/registartion */}
                <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>
                {/* Pages */}

                <Route path='profile' element={<Profile/>}/>

                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='edz' element={<EdzList/>}/>
                <Route path='edz/request' element={<EdzRequest/>}/>
                <Route path='edz/request/:id' element={<EdzRequest/>}/>
                <Route path='edz/view/:id' element={<EdzShow/>}/>

                <Route path='eds' element={<EdsList/>}/>
                <Route path='design' element={<DesignList/>}/>
                <Route path='docs' element={<Docs/>}/>
                <Route path='schedule' element={<Schedule/>}/>
                <Route path='chat' element={<Chat />}/>
                <Route path='news' element={<News/>}/>
                <Route path='news/:id' element={<NewsDetail/>}/>

                {/* Page Not Found */}
                <Route path='*' element={<Error404/>}/>
            </Route>
        </Routes>
    )
}

export {PrivateRoutes}