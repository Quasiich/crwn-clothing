import {useState} from 'react';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";


import './register-form.styles.scss'

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const RegisterForm = (props) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("Cant create a new account. Email is already in use")
            }
            console.log('user creation encountered a error:' + error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className={'sign-up-container'}>
            <h2>Dont have an account yet?</h2>
            <span>Register with your email & password</span>
            <form onSubmit={() => {
            }}>
                <FormInput label={'Display Name'} type={'text'} required onChange={handleChange} name={'displayName'}
                           value={displayName}/>

                <FormInput label={'Email'} type={'email'} required onChange={handleChange} name={'email'}
                           value={email}/>

                <FormInput label={'Password'} type={'password'} required onChange={handleChange} name={'password'}
                           value={password}/>

                <FormInput label={'Confirm Password'} type={'password'} required onChange={handleChange}
                           name={'confirmPassword'}
                           value={confirmPassword}/>
                <div className={"register-button-container"}>
                <Button type={'submit'} onClick={handleSubmit}>REGISTER</Button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;