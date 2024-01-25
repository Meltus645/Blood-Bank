import {Outlet} from 'react-router-dom';
import { NavBar } from '../components';

const LayoutPage = () => {
  return (
    <div className='grid h-screen grid-cols-[200px_auto]'>
      <NavBar />
      <div></div>
      <Outlet />
    </div>
  )
}

export default LayoutPage;