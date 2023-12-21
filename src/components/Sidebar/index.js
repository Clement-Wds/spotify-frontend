import {useState, useEffect} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {RiCloseLine} from 'react-icons/ri';
import {HiOutlineMenu} from 'react-icons/hi';

import {logo} from '../../assets/index.js';
import {links} from '../../assets/constants';

// Reuse in both mobile and desktop
const NavLinks = ({handleClick}) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div className="mt-10">
      {links.map(item => (
        <NavLink
          key={item.name}
          to={item.to}
          className={`flex flex-row justify-start items-center my-8 text-sm font-medium ${
            activeLink === item.to
              ? 'text-green-600'
              : 'text-gray-400 hover:text-green-600'
          }`}
          onClick={() => handleClick && handleClick()}>
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>

      {/* Mobile Menubar */}
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-t1 from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};
export default Sidebar;
