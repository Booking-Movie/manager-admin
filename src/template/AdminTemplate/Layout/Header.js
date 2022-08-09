import React, { useEffect, useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../redux/Action/ManagerAuthAction';
import { getDetailUser } from '../../../redux/Action/ManagerUserAction';
import { isEmptyOrUndefined } from '../../../util/isEmpty';


const Header = () => {
    const dispatch = useDispatch()
    const [openHamBurgerMenu, setOpenHamBurgerMenu] = useState(false);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const { pathname } = useLocation()
    const history = useHistory()
    const userLogin = useSelector(state => {
        if (isEmptyOrUndefined(state.ManagerAuthReducer.userLogin)) {
            history.push('/')
        }
        return state.ManagerAuthReducer.userLogin
    })

    const { id } = userLogin.payload
    const detailUser = useSelector(state => state.ManagerAuthReducer.detailUser)
    const { avatar, username } = detailUser

    useEffect(() => {
        setOpenProfileMenu(false)
        if (userLogin) {
            dispatch(getDetailUser(id))
        } else {
            history.push('/')
        }
    }, [userLogin, history, dispatch, id, pathname])
    return (
        <nav className="header-nav">
            <div className="flex">
                {openHamBurgerMenu ? (
                    <button className="lg:hidden" onClick={() => setOpenHamBurgerMenu(false)}>
                        <Icon.X size={48} color="black" />
                    </button>
                ) : (
                    <button className="lg:hidden" onClick={() => setOpenHamBurgerMenu(true)}>
                        <Icon.Menu size={48} color="black" />
                    </button>
                )}
            </div>
            <ul
                className={`navbar-ul_title ${openHamBurgerMenu ? 'block' : 'hidden lg:inline-flex'
                    } `}
            >
                <NavLink to='/dashboard' className=" flex items-center space-x-6 ">
                    <div className="lg:hidden"><Icon.Monitor size={32} color="black" /></div>
                    <div className='w-full'>
                        <h1>Dashboad</h1>
                    </div>
                    <div className="lg:hidden ml-auto">
                        <Icon.ChevronRight size={16} color="black" />
                    </div>
                </NavLink>
                <NavLink to='users' className=" flex items-center space-x-6">
                    <div className="lg:hidden"><Icon.Users size={32} color="black" /></div>
                    <div className='w-full'>
                        <h1>Manager User</h1>
                    </div>
                    <div className="lg:hidden ml-auto">
                        <Icon.ChevronRight size={16} color="black" />
                    </div>
                </NavLink>
                <NavLink to='movie' className="flex items-center space-x-6">
                    <div className="lg:hidden"><Icon.Film size={32} color="black" /></div>
                    <div className='w-full'>
                        <h1>Manager Movie</h1>
                    </div>
                    <div className="lg:hidden ml-auto">
                        <Icon.ChevronRight size={16} color="black" />
                    </div>
                </NavLink>
                <NavLink to='cinema' className="flex items-center space-x-6">
                    <div className="lg:hidden"><Icon.MapPin size={32} color="black" /></div>
                    <div className='w-full'>
                        <h1>Manager Cinema</h1>
                    </div>
                    <div className="lg:hidden ml-auto">
                        <Icon.ChevronRight size={16} color="black" />
                    </div>
                </NavLink>
                <NavLink to='news' className=" flex items-center space-x-6">
                    <div className="lg:hidden"><Icon.BookOpen size={32} color="black" /></div>
                    <div className='w-full'>
                        <h1>Manager News</h1>
                    </div>
                    <div className="lg:hidden ml-auto">
                        <Icon.ChevronRight size={16} color="black" />
                    </div>
                </NavLink>
            </ul>
            <div className="flex items-center">
                <div>
                    {openProfileMenu ? (
                        <button className="btn-profile" onClick={() => setOpenProfileMenu(false)}>
                            {avatar ? (<img src={avatar} className="w-14 h-14 rounded-[50%]" alt='Avarta Here' />) : (<img src='/default-avatar.png' className="w-14 h-14 rounded-[50%]" alt='Avarta Here' />)}
                            <span >{username}</span>
                        </button>
                    ) : (
                        <button className="btn-profile" onClick={() => setOpenProfileMenu(true)}>
                            {avatar ? (<img src={avatar} className="w-14 h-14 rounded-[50%]" alt='Avarta Here' />) : (<img src='/default-avatar.png' className="w-14 h-14 rounded-[50%]" alt='Avarta Here' />)}
                            <span>{username}</span>
                        </button>
                    )}
                </div>
                <ul className={`navbar-ul_profile ${openProfileMenu ? 'block' : 'hidden'}`}>
                    <NavLink to='profile' className="flex items-center w-full space-x-6">
                        <div><Icon.User size={32} color="black" /></div>
                        <div className='w-full'>
                            <h1>Profile</h1>
                        </div>
                        <div className="ml-auto">
                            <Icon.ChevronRight size={16} color="black" />
                        </div>
                    </NavLink>
                    <NavLink to='/' className="flex items-center w-full space-x-6">
                        <div ><Icon.LogOut size={32} color="black" /></div>
                        <div className='w-full'>
                            <button onClick={() => {
                                dispatch(signOut())
                            }}> <h1>Log out</h1></button>
                        </div>
                        <div className="ml-auto">
                            <Icon.ChevronRight size={16} color="black" />
                        </div>
                    </NavLink>
                </ul>
            </div>
        </nav >
    )

}

export default Header




