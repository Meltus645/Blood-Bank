import {Form} from '../components';
import { Helmet } from 'react-helmet';
import { createUser } from '../api/account-api';
import { NavLink, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigation =useNavigate();
  const fields =[
    [{name: 'first_name', type: 'text', label: 'First Name', placeholder: 'Enter first name', validations: {
      required: {
        value: true,
        message: 'First name required*',
      }
    }}],
    [{name: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Enter last name', validations: {
      required: {
        value: true,
        message: 'Last name required*',
      }
    }}],
    [{name: 'email', type: 'email', label: 'Email', placeholder: 'Enter email', validations: {
      required: {
        value: true,
        message: 'Email required*',
      }
    }}],
    [{name: 'password', type: 'password', label: 'Password', placeholder: 'Enter Password', validations: {
      required: {
        value: true,
        message: 'Password required*',
      }
    }}],
  ];
  const handleRegistration = async values =>{
      const {first_name, last_name, email,  password} =values;
      const {status, message} =await createUser({role: 'donor', bio: {first_name, last_name}, contact: {email}, login: {password}});
      if(status ==201 || status ==409){
        if(status ==409) alert(message);
        navigation('/account/login', {replace: true});
      }else alert(message);   
  }
  return (
    <>
    <Helmet>
      <title>Admin Registration</title>
    </Helmet>
    <Form fields={fields} className='w-[420px]' title={'Signup'} onSubmit={handleRegistration}>
      <div className='py-3'>
        <button className='block bg-blue-500 text-white py-3 px-5 rounded transition all font-[600] uppercase text-center w-full rouded-lg hover:bg-blue-700'>Register</button>
        <p className='pt-2 text-[#555555] font-[500]'>Already user? <NavLink to={'/account/login'} className='text-blue-500 font-[500]'>Signin</NavLink></p>
      </div>
    </Form>
    </>
  )
}

export default RegisterPage;