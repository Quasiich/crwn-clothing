import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import {useState} from "react";
import { useDispatch } from "react-redux";

import {LoginButtonGroup} from './login-form.styles.jsx'
import {SignUpContainer} from '../register-form/register-form.styles.jsx'
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action.js";

const defaultFormFields = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const loginWithGoogle = async () => {
        dispatch(googleSignInStart())
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            dispatch(emailSignInStart(email, password))
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
        <SignUpContainer>
            <h2>Already have an account?</h2>
            <span>Login with your email & password</span>
            <form onSubmit={() => {
            }}>
                <FormInput label={'Email'} type={'email'} required onChange={handleChange} name={'email'}
                           value={email}/>

                <FormInput label={'Password'} type={'password'} required onChange={handleChange} name={'password'}
                           value={password}/>

                <LoginButtonGroup>
                    <Button type={'submit'} onClick={handleLogin}>LOGIN</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={loginWithGoogle}>
                        GOOGLE LOGIN
                    </Button>
                </LoginButtonGroup>
            </form>
        </SignUpContainer>
    )
}

export default LoginForm;