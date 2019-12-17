
import {useState} from 'react'
import {Signin, authenticate} from '../../actions/auth'
import { ReactTransitionGroup } from 'react-transition-group'
import "./auth.scss"
import Router from 'next/router'



const SigninComponent = () =>{

    const [values, setValues] = useState({
        email: 'sojiman@gmail.com',
        password: 'bubblebuttz',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const {email, password, error, loading, message, showForm} = values

    const handleSubmit = (e)=>{
        e.preventDefault()
        setValues({...values, loading: true, error: false})
        const user = {email, password}

        Signin(user)
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }else{
                authenticate(data, ()=>{
                    Router.push(`/`)

                })
            
            }
        })
    }


    const handleChange = (item) => (e)=>{
        setValues({...values, [item]: e.target.value})
    }

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '')
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : "")
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '')

    const signupForm = () =>{
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                    value={email}
                    onChange={handleChange('email')} 
                    type="email" className="form-control" 
                    placeholder="enter your email"/>
                </div>
                <div className="form-group">
                    <input 
                    value={password}
                    onChange={handleChange('password')} 
                    type="password" className="form-control" 
                    placeholder="enter your password"/>
                </div>
                <div>
                    <button className=" btn btn-primary">Sign In</button>
                </div>
            </form>
        )
    }

        return (
            <React.Fragment>
              
                    {showError()}
                    {showLoading()}
                    {showMessage()}
          
          
                {showForm && signupForm()}
                
            </React.Fragment>
        )

}

export default SigninComponent