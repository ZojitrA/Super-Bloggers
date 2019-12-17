import axios from 'axios'
import {API} from '../config'
import cookie from 'js-cookie'

export const Signup = (user) =>{
   return axios.post(`${API}/signup`,{
       name: user.name,
       email: user.email,
       password: user.password
   },{
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
   .then(response =>{
       console.log(response.data)
       return response.data
   }).catch(err => console.log(err))
}

export const Signin = (user) =>{
    return axios.post(`${API}/signin`,{
        email: user.email,
        password: user.password
    },{
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json"
     }
   })
    .then(response =>{
        console.log(response)
        return response.data
    }).catch(err => console.log(err))
 }
export const signout = (next)=>{
    removeCookie('token')
    removeFromLocalStorage('user')
    next()

    return axios.get(`${API}/signout`)
    .then(res =>{
        console.log('signout success')
    }).catch(err =>{
        console.log(err)
    })
}
 export const setCookie = (key, value) =>{
     if(process.browser){
         cookie.set(key, value, {
            expires: 1
         })
     }
 }

 export const removeCookie = (key) =>{
    if(process.browser){
        cookie.remove(key, {
           expires: 1
        })
    }
}

export const getCookie = (key) =>{
    if(process.browser){
        return cookie.get(key);
    }
}

export const setLocalStorage = (key, value)=>{
    if(process.browser){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeFromLocalStorage = (key)=>{
    if(process.browser){
        localStorage.removeItem(key)
    }
}

export const authenticate = (data, next) =>{
    setCookie('token', data.token)
    setLocalStorage('user', data.user)
    next()
}

export const isAuth = () =>{
    if(process.browser){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false
            }
        }
    }
}