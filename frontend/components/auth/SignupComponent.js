
import {useState} from 'react'
import {Signup} from '../../actions/auth'
import { ReactTransitionGroup } from 'react-transition-group'
import "./auth.scss"



const SignupComponent = () =>{

    const [values, setValues] = useState({
        name: 'Amiracle',
        email: 'sojiman@gmail.com',
        password: 'bubblebuttz',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const {name, email, password, error, loading, message, showForm} = values

    const handleSubmit = (e)=>{
        e.preventDefault()
        setValues({...values, loading: true, error: false})
        const user = {name, email, password}

        Signup(user)
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }else{
                setValues({
                    ...values, 
                    name: '', 
                    email: '', 
                    password: '', 
                    error: '', 
                    loading: false, 
                    message: data.message,
                    showForm: false
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
                    value={name}
                    onChange={handleChange('name')} 
                    type="text" 
                    className="form-control" 
                    placeholder="enter your name"/>
                </div>
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
                    <button className=" btn btn-primary">Sign Up</button>
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

export default SignupComponent