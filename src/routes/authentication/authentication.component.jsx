import RegisterForm from "../../components/register-form/register-form.component";
import LoginForm from "../../components/login-form/login-form.component";
import {AuthenticationContainer} from './authentication.styles.jsx'

const Authentication = (props) => {

    return (
        <AuthenticationContainer>
            <LoginForm/>
            <RegisterForm></RegisterForm>
        </AuthenticationContainer>
    )
}


export default Authentication;