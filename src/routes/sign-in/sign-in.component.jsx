import {signInWithGooglePopup} from '../../utils/firebase/firebase.utils'

const SignIn = (props) => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response)
    }

    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>
                sign in with Google Popop
            </button>
        </div>
    )
}


export default SignIn;