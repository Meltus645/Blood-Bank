import {Navigate} from 'react-router-dom';

const ProtectedPages = ({isAuth , children}) => {
  return isAuth? <>{children}</>: <Navigate to={'account/login'} replace ={true}/>
}

export default ProtectedPages;