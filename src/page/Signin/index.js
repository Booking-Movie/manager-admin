/* eslint-disable jsx-a11y/img-redundant-alt */
import Label from "../../components/Label";
import InputComponent from "../../components/Input";
import { Button } from '../../components/Button';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/Action/ManagerAuthAction';
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
            history.push('/')
        } else if (action.toString().includes('403')) {
            setHasError({ error: "403" })
        }
    }

    const goToDashboard = useCallback(() => {
        history.push('dashboard')
    }, [history])

    useEffect(() => {
        if (localStorage.getItem(TOKEN) && localStorage.getItem(USER_LOGIN)) {
            goToDashboard()
        }
    }, [goToDashboard])
    return (
        <>
            <div className="bg-hero-img container-bg_login" />
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
                {/* <p className='text-center'>Don't have an account?<span className='font-semibold text-slate-500 hover:text-black'> <NavLink to="/signup">Register now</NavLink></span></p> */}
            </div>
        </>
    )
}

export default Signin