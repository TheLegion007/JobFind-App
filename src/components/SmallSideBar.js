import Wrapper from '../assets/wrappers/SmallSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { toggleSidebar } from '../features/user/userSlice';
import links from '../utils/links';

const SmallSideBar = () => {
  const { isSideBarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const toggle = () => {
    console.log("isSidebarOpen: ",isSideBarOpen);
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className={isSideBarOpen ? 'sidebar-container':'sidebar-container show-sidebar'}>
        <div className="content">
          <button type='button' className='close-btn' onClick={toggle}>
            <FaTimes/>
          </button>
          <header>
            <Logo/>
          </header>
          <div className='nav-links'>
            {links.map((link) => {
                const {text, path, id, icon } = link;
                return (
                  <NavLink 
                    to={path} 
                    key={id} 
                    onClick={toggle}
                    className={({isActive}) => 
                    isActive? 'nav-link active' : 'nav-link'
                    }>
                    <span className='icon'>{icon}</span>
                    {text}
                  </NavLink>
                )
            })
            }
          </div>
        </div>
      </div>
    </Wrapper>    
  );
;}

export default SmallSideBar;