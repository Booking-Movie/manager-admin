/* eslint-disable jsx-a11y/img-redundant-alt */
import * as Icon from 'react-feather';
import Label from "../../components/Label";
import InputComponent from "../../components/Input";
import { Button } from '../../components/Button';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/Action/ManagerAuthAction';
import { history } from '../../App';
import ManagerAuthReducer from '../../redux/Reducer/AuthReducer/index'
import { TOKEN, USER_LOGIN } from '../../util/setting/config';

const Signin = () => {
    const [formData, setFromData] = useState({
        username: '',
        password: ''
    });
    const [hasError, setHasError] = useState({
        error: ''
    })
    const dispatch = useDispatch()
    const history = useHistory()
    const handleChange = (e) => {
        e.preventDefault()
        setFromData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSignin = async (e) => {
        e.preventDefault()
        const action = await dispatch(signIn(formData, goToDashboard))
        if (action.toString().includes('401')) {
            setHasError({ error: "401" })
        } else if (action.toString().includes('403')) {
            setHasError({ error: "403" })
        }

    }

    const goToDashboard = () => {
        history.push("dashboard")
    }
    useEffect(() => {
        if (localStorage.getItem(TOKEN) && localStorage.getItem(USER_LOGIN)) {
            goToDashboard()
        }
    }, [])
    return (
        <>
            <div className="bg-hero-img bg-cover bg-center bg-no-repeat w-[100vw] h-[100vh] relative z-0 blur" />
            <div className='signin-container flex flex-col gap-y-8'>
                <div className='flex flex-col gap-4 items-center'>
                    <img src='/images/ImageMoive.png' alt='Logo Image' />
                    <h1>Booking Movie Login</h1>
                    <p className='text-center'>Hey, Enter your details to get sign in to your account</p>
                </div>
                <form onSubmit={handleSignin} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <Label size="text-normal">Username</Label>
                            <InputComponent type="text" name="username" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label size="text-normal">Password</Label>
                            <InputComponent type="password" name="password" onChange={handleChange} />
                        </div>
                        {hasError.error === "403" ? <div className="label-error">Username or password is incorrect.</div> : hasError.error === "401" ? <div className="label-error">Unauthorized.</div> : <></>}
                        <Button
                            className="btn-primary self-stretch"
                        >
                            <span className='text-base font-semibold'>Sign in</span>
                        </Button>
                    </div>
                </form>
                <p className='text-center'>Don't have an account?<span className='font-semibold text-slate-500 hover:text-black'> <NavLink to="/signup">Register now</NavLink></span></p>
            </div>
        </>
    )
}

export default Signin