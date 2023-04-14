import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit"
import { userActions } from "../store/user.slice";
import { newsActions } from "../store/news.slice";

const actions = {
    ...userActions,
    ...newsActions
}

export const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
}