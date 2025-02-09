import CustomWalletButton from "./CustomWalletButton";
import { Menu, X } from "lucide-react";
import { navItems } from "../constants";
import { useState } from "react";
// import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

const Navbar = () => {
  // const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };
  return (
    <nav className='sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80'>
      <div className='container px-4 mx-auto relative text-sm'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center flex-shrink-0'>
            <span className='text-xl tracking-tight font-bold cursor-pointer'>
              Solana Wallet
            </span>
          </div>
          <ul className='hidden lg:flex ml-14 space-x-12'>
            {navItems.map((item, index) => (
              <li key={index} className='hover:text-purple-600 text-lg font-md hover:underline'>
                <a href={item.href} onClick={handleClick}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className='hidden lg:flex justify-center space-x-12 items-center'>
            <CustomWalletButton />
          </div>
          <div className='lg:hidden md:flex flex-col justify-end'>
            <button onClick={toggleNavigation}>
              {openNavigation ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {openNavigation && (
          <div className='fixed h-screen bg-violet-500 right-0 z-20 w-full p-12 flex flex-col justify-center items-center lg:hidden overflow-hidden'>
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className='py-4 hover:text-white'>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className='flex space-x-6'>
              <CustomWalletButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;