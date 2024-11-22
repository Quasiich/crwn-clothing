import {useState} from 'react';

const defaultFormFields = {
   displayName: "",
   email: "",
   password: "",
   confirmPassword: ""
}

const RegisterForm = (props) => {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const {displayName, email, password, confirmPassword} = formFields;

   const handleChange = (event) => {
      const {name, value} = event.target;

      console.log(formFields)

      setFormFields({...formFields, [name]: value});
   }

   return (
      <div>
         <h1>Register with your email & password</h1>
         <form onSubmit={() => {}}>
            <label htmlFor="">Display Name</label>
            <input type={'text'} required onChange={handleChange} name={'displayName'} value={displayName}/>

            <label htmlFor="">Email</label>
            <input type={'email'} required onChange={handleChange} name={'email'} value={email}/>

            <label htmlFor="">Password</label>
            <input type={'password'} required onChange={handleChange} name={'password'} value={password}/>

            <label htmlFor="">Confirm Password</label>
            <input type={'password'} required onChange={handleChange} name={'confirmPassword'} value={confirmPassword}/>

            <button type={'submit'}>SUBMIT</button>
         </form>
      </div>
   )
}

export default RegisterForm;