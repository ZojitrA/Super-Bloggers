import Layout from '../components/Layout'
import Link from 'next/link'
import SignUp from '../components/auth/SignupComponent'

const Signup = ()=>{
    return (
    <Layout>
        <h2>Signup page</h2>
        <SignUp/>
    </Layout>
    )}

export default Signup