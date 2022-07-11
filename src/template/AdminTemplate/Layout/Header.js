import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../redux/Action/ManagerAuthAction';
import ManagerAuthReducer from '../../../redux/Reducer/AuthReducer/index'
import { getDetailUser } from '../../../redux/Action/ManagerUserAction';
import { isEmptyOrUndefined } from '../../../util/isEmpty';
// import { history } from '../../../App';


const Header = () => {
    const dispatch = useDispatch()
    const [openHamBurgerMenu, setOpenHamBurgerMenu] = useState(false);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const history = useHistory()
    const userLogin = useSelector(state => {
        if (isEmptyOrUndefined(state.ManagerAuthReducer.userLogin)) {
            history.push('/')
            history.go(0)
        }
        return state.ManagerAuthReducer.userLogin
    })

    const { id } = userLogin.payload
    const detailUser = useSelector(state => state.ManagerAuthReducer.detailUser)
    const { avatar, username } = detailUser

    useEffect(() => {
        if (userLogin) {
            dispatch(getDetailUser(id))
        } else {
            history.push('/')
            history.go(0)
        }
    }, [userLogin])

    return (
        <nav className="flex flex-row fixed justify-between bg-white w-full top-0 text-black p-6 shadow-shadowbox z-50">
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
                className={`flex lg:flex-row flex-col gap-y-9 lg:gap-x-6 mr-auto absolute top-[103px] left-0 lg:static p-6 bg-white text-subtitle font-semibold lg:items-center z-0 lg:py-0  shadow-shadowbox lg:shadow-none   ${openHamBurgerMenu ? 'block' : 'hidden lg:inline-flex'
                    } `}
            >
                <NavLink to='/dashboard' className=" flex items-center gap-x-6 ">
                    <div className="lg:hidden"><Icon.Monitor size={32} color="black" /></div>
                    <div>
                        <h1 className='text-lg sm:text-base lg:text-gray-600 lg:hover:text-black lg:transition-all'>Dashboad</h1>
                    </div>
                    <div className="lg:hidden ml-auto">
                        <Icon.ChevronRight size={16} color="black" />
                    </div>
                </NavLink>
                <NavLink to='users' className=" flex items-center gap-x-6">
                    <div className="lg:hidden"><Icon.Users size={32} color="black" /></div>
                    <div>
                        <h1 className='text-lg sm:text-base lg:text-gray-600 lg:hover:text-black lg:transition-all'>Manager User</h1>
                    </div>
                    <div className="lg:hidden ml-auto">
                        <Icon.ChevronRight size={16} color="black" />
                    </div>
                </NavLink>
                <NavLink to='movie' className=" flex items-center gap-x-6">
                    <div className="lg:hidden"><Icon.Film size={32} color="black" /></div>
                    <div>
                        <h1 className='text-lg sm:text-base lg:text-gray-600 lg:hover:text-black lg:transition-all'>Manager Movie</h1>
                    </div>
                    <div className="lg:hidden ml-auto">
                        <Icon.ChevronRight size={16} color="black" />
                    </div>
                </NavLink>
                <NavLink to='cinema' className=" flex items-center gap-x-6">
                    <div className="lg:hidden"><Icon.MapPin size={32} color="black" /></div>
                    <div>
                        <h1 className='text-lg sm:text-base lg:text-gray-600 lg:hover:text-black lg:transition-all'>Manager Cinema</h1>
                    </div>
                    <div className="lg:hidden ml-auto">
                        <Icon.ChevronRight size={16} color="black" />
                    </div>
                </NavLink>
                <NavLink to='news' className=" flex items-center gap-x-6">
                    <div className="lg:hidden"><Icon.BookOpen size={32} color="black" /></div>
                    <div>
                        <h1 className='text-lg sm:text-base lg:text-gray-600 lg:hover:text-black lg:transition-all'>Manager News</h1>
                    </div>
                    <div className="lg:hidden ml-auto">
                        <Icon.ChevronRight size={16} color="black" />
                    </div>
                </NavLink>
            </ul>
            <div className="flex items-center">
                <div>
                    {openProfileMenu ? (
                        <button className="flex flex-row gap-x-3 items-center" onClick={() => setOpenProfileMenu(false)}>
                            {avatar ? (<img src={avatar} className="w-14 h-14 rounded-[50%]" alt='Avarta Here' />) : (<img src='/default-avatar.png' className="w-14 h-14 rounded-[50%]" alt='Avarta Here' />)}
                            <span className="text-lg sm:text-base font-semibold">{username}</span>
                        </button>
                    ) : (
                        <button className="flex flex-row gap-x-3 items-center" onClick={() => setOpenProfileMenu(true)}>
                            {avatar ? (<img src={avatar} className="w-14 h-14 rounded-[50%]" alt='Avarta Here' />) : (<img src='/default-avatar.png' className="w-14 h-14 rounded-[50%]" alt='Avarta Here' />)}
                            <span className="text-lg sm:text-base font-semibold">{username}</span>
                        </button>
                    )}
                </div>
                <ul className={`flex flex-col gap-y-6 p-4 absolute top-[103px] right-0 bg-white lg:items-center text-subtitle font-semibold shadow-shadowbox lg:shadow-none  ${openProfileMenu ? 'block' : 'hidden'}`}>
                    <NavLink to='/' className=" flex items-center gap-x-6">
                        <div ><Icon.LogOut size={32} color="black" /></div>
                        <div>
                            <button onClick={() => {
                                dispatch(signOut())
                            }}> <h1 className='text-lg sm:text-base'>Log out</h1></button>
                        </div>
                        <div className="ml-auto">
                            <Icon.ChevronRight size={16} color="black" />
                        </div>
                    </NavLink>
                    <NavLink to='profile' className=" flex items-center gap-x-6 w-full">
                        <div ><Icon.User size={32} color="black" /></div>
                        <div>
                            <h1 className='text-lg sm:text-base text-black lg:transition-all'>Profile</h1>
                        </div>
                        <div className="ml-auto">
                            <Icon.ChevronRight size={16} color="black" />
                        </div>
                    </NavLink>
                </ul>
            </div>
        </nav>
    )

}

export default Header




