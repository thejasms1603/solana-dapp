import CustomWalletButton from "./CustomWalletButton";
import { Menu, X } from "lucide-react";
import { navItems } from "../constants";
import { useState } from "react";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  return (
    <nav className='sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80'>
      <div className='container px-4 mx-auto relative text-sm'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center flex-shrink-0'>
            <span className='text-xl tracking-tight font-bold'>Solana Wallet</span>
          </div>
          <ul className='hidden lg:flex ml-14 space-x-12'>
            {navItems.map((item, index) => (
              <li key={index} className="hover:text-violet-900 text-lg font-md">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className='hidden lg:flex justify-center space-x-12 items-center'>
            <CustomWalletButton />
          </div>
          <div className='lg:hidden md:flex flex-col justify-end'>
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
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