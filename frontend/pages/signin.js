import Layout from '../components/Layout'
import Link from 'next/link'
import SignIn from '../components/auth/SigninComponent'

const Signin = ()=>{
    return (
    <Layout>
        <h2 className="text-center pt-4 pb-4">Sign in</h2>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <SignIn/>
            </div>
        </div>
    </Layout>
    )}

export default Signin