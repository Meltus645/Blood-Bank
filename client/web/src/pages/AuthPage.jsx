import { useContext, useEffect } from "react";
import AuthContext from "../context/auth-context";
import { Outlet, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate =useNavigate()
  const {isAuth} =useContext(AuthContext);
  useEffect(() =>{
    if(isAuth) navigate('/');
  })
  return (
    <section className="min-h-screen flex justify-center items-center bg-[#f1f1f1] py-8">
        <Outlet />
    </section>
  )
}

export default AuthPage;