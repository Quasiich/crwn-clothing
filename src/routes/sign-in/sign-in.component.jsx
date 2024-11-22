import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import RegisterForm from "../../components/register-form/register-form.component";

const SignIn = (props) => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>
                sign in with Google Popop
            </button>
           <RegisterForm></RegisterForm>
        </div>
    )
}


export default SignIn;