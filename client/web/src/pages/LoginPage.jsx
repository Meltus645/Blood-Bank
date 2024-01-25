import {Form} from '../components';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { loginUser } from '../api/account-api';
import AuthContext from '../context/auth-context';
import { NavLink, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const {setUserID, setIsAuth, setName} =useContext(AuthContext);
  const fields =[
    [{name: 'email', type: 'text', label: 'Email', placeholder: 'Enter email', validations: {
      required: {
        value: true,
        message: 'Login Email required*',
      }
    }}],
    [{name: 'password', type: 'password', label: 'Password', placeholder: 'Enter Password', validations: {
      required: {
        value: true,
        message: 'Password required*',
      }
    }}],
  ];
  const navigate =useNavigate();
  const handleLogin = async credentials =>{
    const {message, status, session} =await loginUser(credentials);
    if(status ==200){
      const {first_name, last_name, _id} =session;
      const name =`${first_name} ${last_name}`;
      localStorage.setItem('session', JSON.stringify({name, userID: _id, isAuth: true}));
      setUserID(_id);
      setIsAuth(true);
      setName(name);
      navigate('/', {replace: true});
    }else alert(message);
  }
  return (
    <>
    <Helmet>
      <title>Admin Login</title>
    </Helmet>
    <Form fields={fields} className='w-[420px]' title={'login'} onSubmit={handleLogin}>
      <div className='py-3'>
        <button className='block bg-blue-500 text-white py-3 px-5 rounded transition all font-[600] uppercase text-center w-full rouded-lg hover:bg-blue-700'>Login</button>
        <p className='pt-2 text-[#555555] font-[500]'>New here? <NavLink to={'/account/register'} className='text-blue-500 font-[500]'>Signup</NavLink></p>
      </div>
    </Form>
    </>
  )
}

export default LoginPage;