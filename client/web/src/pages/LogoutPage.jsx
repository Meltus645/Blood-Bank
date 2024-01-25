import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";


const LogoutPage = () => {
  const navigate =useNavigate();
  const {setName, setIsAuth, setUserID} =useContext(AuthContext);
  useEffect(() =>{
    setName(null);
    setIsAuth(false);
    setUserID(null);
    localStorage.removeItem('session');
    navigate('/account/login', {replace: true})
  }, []);
  return (
    <div>LogoutPage</div>
  )
}

export default LogoutPage;