import Layout from '../components/Layout'
import Link from 'next/link'
import SignUp from '../components/auth/SignupComponent'

const Signup = ()=>{
    return (
    <Layout>
        <h2 className="text-center pt-4 pb-4">Sign up</h2>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <SignUp/>
            </div>
        </div>
    </Layout>
    )}

export default Signup