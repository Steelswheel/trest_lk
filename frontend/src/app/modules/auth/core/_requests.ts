import axios from 'axios'

import {IUserModel} from '../../../store/user.slice'
const API_URL = process.env.REACT_APP_API_URL + "/api"

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `${API_URL}/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<IUserModel>(LOGIN_URL, {
    email,
    password,
  })
}

export function loginByToken(token: string) {
  return axios.post<IUserModel>(LOGIN_URL, {
    token
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {

  return axios.post<IUserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
