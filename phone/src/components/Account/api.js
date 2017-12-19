import axios from 'axios'
import BaseApp from '../Config/config'

export const Register=(email,password,name)=> axios.post(`${BaseApp.baseURL}/users/register`,{email,password,role:"phone",name})
export const Login=(email,password)=> axios.post(`${BaseApp.baseURL}/users/login`,{email,password})