import RegisterForm from "../../components/register-form/register-form.component";
import LoginForm from "../../components/login-form/login-form.component";
import './authentication.styles.scss'

const Authentication = (props) => {

    return (
        <div className="authentication-container">
            <LoginForm/>
            <RegisterForm></RegisterForm>
        </div>
    )
}


export default Authentication;