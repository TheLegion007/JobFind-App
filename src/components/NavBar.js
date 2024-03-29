import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';

import { useDispatch, useSelector} from 'react-redux';
import { toggleSidebar, logoutUser} from '../features/user/userSlice';
import { useState } from 'react';



const NavBar = () => {
  const {user} = useSelector((store)=> store.user);
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
  <Wrapper>
    <div className="nav-center">
        <button className="toggle-btn" onClick={toggle}>
            <FaAlignLeft/>
        </button>
        <div>
            <Logo/>
            <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
            <button type='button' className='btn' onClick={()=> setShowLogout(!showLogout)}>
                 {/* {console.log("showLogout: ", showLogout)} */}
                <FaUserCircle/>
                {user?.name}
                <FaCaretDown/>
            </button>
            <div className={showLogout? 'dropdown show-dropdown': 'dropdown'}>
                <button type="button" className='dropdown-btn' 
                    onClick={() => {
                         dispatch(logoutUser());
                         //console.log("logout :" , user.name);
                        }}>
                    logout
                </button>
            </div> 
        </div>
    </div>
    </Wrapper>
  );
};

export default NavBar;