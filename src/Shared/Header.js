import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
// import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import auth from '../firebase_init';

const Header = ({ dark, setDark }) => {
    const [user] = useAuthState(auth);
    //console.log(user);
    const logOut = () => {
        signOut(auth)
        localStorage.removeItem('accessToken')
    }
    return (
        <div className=''>
            <div className="navbar bg-base-100 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabindex="0" className="btn btn-ghost lg:hidden">
                            <AiOutlineMenuUnfold className='text-2xl' />
                        </label>
                        <ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink to='/home'>Home</NavLink></li>
                            <li><NavLink to='/blogs'>Blogs</NavLink></li>
                            {user &&<li><NavLink to='/dashboard'>DashBoard</NavLink></li>}
                            <li><NavLink to='/portfolio'>Portfolio</NavLink></li>
                            {!user && <li><NavLink to='/register'>Register</NavLink></li>}
                            {
                                user ?
                                    <div class="dropdown dropdown-end">
                                        <label tabindex="0" class="btn btn-ghost avatar">
                                            <div class="w-10 rounded-full">
                                                <span>{user.displayName}</span>
                                            </div>
                                        </label>
                                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><button onClick={logOut}>Sign Out</button></li>
                                        </ul>
                                    </div>
                                    : <li><NavLink to='/login'>Login</NavLink></li>
                            }
                        </ul>
                    </div>
                    <NavLink to='/' className="btn btn-ghost normal-case text-xl">Manufacture</NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li><NavLink to='/home'>Home</NavLink></li>
                        <li><NavLink to='/blogs'>Blogs</NavLink></li>
                        {user &&<li><NavLink to='/dashboard'>DashBoard</NavLink></li>}
                        <li><NavLink to='/portfolio'>Portfolio</NavLink></li>
                        {!user && <li><NavLink to='/register'>Register</NavLink></li>}
                        <label class="swap swap-rotate" onClick={() => setDark(dark)}>
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" />
                            <svg class="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                            <svg class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                        </label>
                        {
                            user ?
                                <div class="dropdown dropdown-end">
                                    <label tabindex="0" class="btn btn-outline  avatarp pt-1">
                                        <div class="rounded">
                                            {user.displayName}
                                        </div>
                                    </label>
                                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-glass border-primary border rounded-box w-52">
                                        <li><button className='underline' onClick={logOut}>Sign Out</button></li>
                                    </ul>
                                </div>
                                : <li><NavLink to='/login'>Login</NavLink></li>
                        }

                    </ul>

                </div>
                <div className="navbar-end">
                    <label tabIndex="1" for="dashboard" className="btn btn-ghost lg:hidden">
                        <AiOutlineMenuFold className='text-2xl' />
                    </label>
                </div>
            </div>

        </div>
    );
};

export default Header;