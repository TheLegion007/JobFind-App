import Wrapper from '../assets/wrappers/SmallSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { toggleSidebar } from '../features/user/userSlice';
import links from '../utils/links';
import NavLinks from './NavLinks';

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
          <NavLinks toggleSidebar={toggle} />
          </div>
        </div>
    </Wrapper>    
  );
;}

export default SmallSideBar;