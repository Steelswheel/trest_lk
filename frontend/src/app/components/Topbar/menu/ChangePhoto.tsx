import InputFile, {IUploadedFiles} from "../../../components/Input/InputFile";
import {useEffect, useRef, useState} from "react";
import {useApiPost} from "../../../../API";
import {IUserModel, userActions} from '../../../store/user.slice'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";

export const ChangePhoto = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state:RootState) => state.user)

    const [file, setFile] = useState<IUploadedFiles[]>([])

    const [fetchChangePhoto, {isLoading: isLoadingChangePhoto}] = useApiPost('/user/photo')
    const [fetchUserData, {isLoading: isLoadingUserData}] = useApiPost<IUserModel>('/verify_token')

    const onChangePhoto = async (f:IUploadedFiles[]) => {

        if(f.length > 0){
            let url = f[0].url
            setFile([])

            await fetchChangePhoto({url})
            let userData = await fetchUserData({api_token: currentUser.api_token})
            if(userData.img){
                dispatch(userActions.setImg(userData.img))
            }
        }
    }

    const fileInputWrap: any = useRef(null);
    const load = (e: any) => {
        fileInputWrap.current.querySelector('input[type="file"]').click()
        e.preventDefault();
    }

    return (<>

        <div ref={fileInputWrap} style={{display: 'none'}}>
            <InputFile value={file} onChange={onChangePhoto}  isEdit={true}/>
        </div>

        <div className="mx-5 my-3">
            <a href="#" onClick={load} >
                Загрузить фотографию {(isLoadingChangePhoto || isLoadingUserData) && (<>...</>)}
            </a>
        </div>

    </>)
}