import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    loginAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import {useState, useContext} from "react";
import {UserContext} from '../../contexts/user.context'

import './login-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const loginWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const {user} = await loginAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                alert("Invalid credentials. Check your email and password")
            }
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Login with your email & password</span>
            <form onSubmit={() => {
            }}>
                <FormInput label={'Email'} type={'email'} required onChange={handleChange} name={'email'}
                           value={email}/>

                <FormInput label={'Password'} type={'password'} required onChange={handleChange} name={'password'}
                           value={password}/>

                <div className={"login-buttons-group"}>
                    <Button type={'submit'} onClick={handleLogin}>LOGIN</Button>
                    <Button buttonType={"google"} onClick={loginWithGoogle}>
                        GOOGLE LOGIN
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default LoginForm;