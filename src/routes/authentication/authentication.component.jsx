import RegisterForm from "../../components/register-form/register-form.component";
import LoginForm from "../../components/login-form/login-form.component";

const Authentication = (props) => {

    return (
        <div>
            <h1>Sign in Page</h1>
            <LoginForm/>
            <RegisterForm></RegisterForm>
        </div>
    )
}


export default Authentication;