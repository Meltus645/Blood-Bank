import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faDroplet, faHomeAlt, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const SideNavigationComponent = () => {
  const links =[
    {label: 'Dashboard', to: '/', icon: faHomeAlt},
    {label: 'Centers', to: '/donation-centers', icon: faDroplet},
    {label: 'Donors', to: '/donors', icon: faUsers},
    {label: 'Logout', to: '/account/logout', icon: faSignOutAlt},
  ];

  return (
    <nav className='fixed w-[200px] px-2 h-[100vh] flex flex-col py-8 gap-5 bg-[#242a49] sidebar text-[1rem]'>
      {links.map(({label, to, icon}) =>(<NavLink to={to} key={label} className='px-4 py-2 text-gray-500 flex items-center gap-2 text-lg font-[500] rounded transition-all hover:bg-[#d2d2d807] hover:text-gray-400'><FontAwesomeIcon className='block' icon={icon}/><span className='block text-[1.25rem]'>{label}</span></NavLink>))}
    </nav>
  )
}

export default SideNavigationComponent