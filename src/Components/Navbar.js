import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai'; 
import logo from "../images/logo.png";
import { useState } from 'react';



const Navbar = () => {

    const [toggleMenu, setToggleMenu] = useState(true)

    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <img src={logo} alt={"Logo"} className='w-32 cursor-pointer'/>
            </div>
            <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
            </ul>
            <div className='flex relative'>
                {toggleMenu ? 
                <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)}/> 
                : 
                <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)}/> 
                }
            </div>
        </nav>
    )
}

export default Navbar;