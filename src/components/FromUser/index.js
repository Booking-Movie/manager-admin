/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/alt-text */
import { Button } from "../Button"
import InputComponent from "../Input"
import Label from "../Label"
import Select from "../Select"
import * as Icon from 'react-feather';
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionUserEdit, createUser } from "../../redux/Action/ManagerUserAction";
import axios from "axios";


export const CreateUserModal = () => {
    const dispatch = useDispatch()
    const [img, setImg] = useState('')
    const [isFormValidated, setIsFormValidated] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
        fullname: "",
        address: "",
        email: "",
        phone: "",
        role: "",
        avatar: {},
    })
    const [formValidation, setFormValidation] = useState({
        usernameValidation: "",
        passwordValidation: "",
        fullnameValidation: "",
        emailValidation: "",
        roleValidation: "",
        phoneValidation: ""
    });
    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/jpeg') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImg(e.target.result)
            }
        }
        setForm({
            ...form,
            [e.target.name]: file
        })
    }
    const checkExist = useCallback((email) => {
        axios({
            url: `http://localhost:7000/api/v1/check/email/${email}`,
            method: 'GET'
        })
            .then(res => {
                const emailRegex =
                    // eslint-disable-next-line no-useless-escape
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                const emailRegexCheck = email.match(emailRegex);
                if (email === '') {
                    setFormValidation({
                        ...formValidation,
                        emailValidation: 'warning',
                    });
                } else if (res.data?.length !== 0) {
                    setFormValidation({
                        ...formValidation,
                        emailValidation: 'error-existed',
                    });
                } else if (!emailRegexCheck) {
                    setFormValidation({
                        ...formValidation,
                        emailValidation: 'error-format',
                    });
                } else if (res.data?.length === 0 && emailRegexCheck) {
                    setFormValidation({
                        ...formValidation,
                        emailValidation: 'success',
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [formValidation])
    const checkExistUsername = useCallback((username) => {
        axios({
            url: `http://localhost:7000/api/v1/check/username/${username}`,
            method: 'GET'
        })
            .then(res => {
                if (res.data?.length !== 0) {
                    setFormValidation({
                        ...formValidation,
                        usernameValidation: 'error-existed',
                    });
                } else if (res.data?.length === 0) {
                    setFormValidation({
                        ...formValidation,
                        usernameValidation: 'success',
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [formValidation])

    const handleChange = async (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value.trim()
        })

        // Check validation username
        if (e.target.name === 'username') {
            if (e.target.value.trim() === '') {
                setFormValidation({
                    ...formValidation,
                    usernameValidation: 'warning',
                });
            } else {
                checkExistUsername(e.target.value.trim())
            }
        }
        // Check validation password
        if (e.target.name === 'password') {
            if (e.target.value.trim() === '') {
                setFormValidation({
                    ...formValidation,
                    passwordValidation: 'warning',
                });
            } else {
                const passwordCheckResult = e.target.value.length >= 6;

                if (passwordCheckResult) {
                    setFormValidation({
                        ...formValidation,
                        passwordValidation: 'success',
                    });
                } else {
                    setFormValidation({
                        ...formValidation,
                        passwordValidation: 'error',
                    });
                }
            }
        }

        // Check validation fullname
        if (e.target.name === 'fullname') {
            if (e.target.value.trim() === '') {
                setFormValidation({
                    ...formValidation,
                    fullnameValidation: 'warning',
                });
            } else {
                setFormValidation({
                    ...formValidation,
                    fullnameValidation: 'success',
                });
            }
        }

        // Check validation email
        if (e.target.name === 'email') {
            if (e.target.value.trim() === '') {
                setFormValidation({
                    ...formValidation,
                    emailValidation: 'warning',
                });
            } else {
                checkExist(e.target.value.trim())
            }
        }
        if (e.target.name === 'phone') {
            if (e.target.value.trim() === '') {
                setFormValidation({
                    ...formValidation,
                    phoneValidation: '',
                });
            } else {

                const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
                const phoneCheckResult = e.target.value.match(phoneRegex);
                if (phoneCheckResult) {
                    setFormValidation({
                        ...formValidation,
                        phoneValidation: 'success',
                    });
                } else {
                    setFormValidation({
                        ...formValidation,
                        phoneValidation: 'warning',
                    });
                }
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData();
        for (let key in form) {
            if (key !== "avatar") {
                formData.append(key, form[key])
            } else {
                formData.append('avatar', form.avatar)
            }
        }
        dispatch(createUser(formData))
    }
    useEffect(() => {
        if (
            formValidation.usernameValidation === 'success' &&
            formValidation.passwordValidation === 'success' &&
            formValidation.emailValidation === 'success'
        ) {
            setIsFormValidated(true);
        } else {
            setIsFormValidated(false);
        }
    }, [formValidation.usernameValidation, formValidation.passwordValidation, formValidation.emailValidation])

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal" >Username</Label>
                        <InputComponent type="text" name="username" onChange={handleChange} />
                    </div>
                    {formValidation &&
                        (formValidation['usernameValidation'] === 'success' ? (
                            <div className="label-success">This username address is valid.</div>
                        ) : formValidation['usernameValidation'] === 'warning' ? (
                            <div className="label-warning">Please input the username.</div>
                        ) : formValidation['usernameValidation'] === 'error-existed' ? (
                            <div className="label-error">
                                This username has been registered in the system. Please try another one.
                            </div>
                        ) : null)}
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Password</Label>
                        <InputComponent type="password" name="password" onChange={handleChange} />
                    </div>
                    {formValidation &&
                        (formValidation['passwordValidation'] === 'success' ? (
                            <div className="label-success">This password is valid.</div>
                        ) : formValidation['passwordValidation'] === 'warning' ? (
                            <div className="label-warning">Please input the password.</div>
                        ) : formValidation['passwordValidation'] === 'error' ? (
                            <div className="label-error">Password must be greater than 6 characters.</div>
                        ) : null)}
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Full Name</Label>
                        <InputComponent type="text" name="fullname" onChange={handleChange} />
                    </div>
                    {formValidation && (formValidation['fullnameValidation'] === 'success' ? (
                        <div className="label-success">This fullname is valid.</div>
                    ) : formValidation['fullnameValidation'] === 'warning' ? (
                        <div className="label-warning">Please input the fullname.</div>
                    ) : null)}
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Address</Label>
                        <InputComponent type="text" name="address" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Email</Label>
                        <InputComponent type="email" name="email" onChange={handleChange} />
                    </div>
                    {formValidation &&
                        (formValidation['emailValidation'] === 'success' ? (
                            <div className="label-success">This email address is valid.</div>
                        ) : formValidation['emailValidation'] === 'warning' ? (
                            <div className="label-warning">Please input the email address.</div>
                        ) : formValidation['emailValidation'] === 'error-format' ? (
                            <div className="label-error">
                                This email has an invalid email address format. Please try again.
                            </div>
                        ) : formValidation['emailValidation'] === 'error-existed' ? (
                            <div className="label-error">
                                This email has been registered in the system. Please try another one.
                            </div>
                        ) : null)}
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Phone Number</Label>
                        <InputComponent type="phone" name="phone" onChange={handleChange} />
                    </div>
                    {formValidation && formValidation['phoneValidation'] === 'warning' ? (
                        <div className="label-warning">Invalid phone number format.</div>
                    ) : formValidation && formValidation['phoneValidation'] === 'success' ? (
                        <div className="label-success">This phone number is valid.</div>
                    ) : null}
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Role</Label>
                        <Select name="role" onChange={handleChange}>
                            <option defaultValue={'disabled'} >
                                {'Select user role'}
                            </option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option></Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Image Movie</Label>
                        <InputComponent type="file" name="avatar" onChange={handleChangeFile} />
                        <img style={{ width: 150, height: 150 }} src={img} />
                    </div>
                    <Button icon disabled={!isFormValidated}
                        className={`${isFormValidated ? `btn-primary` : `btn-disabled`} self-start sm:self-stretch lg:self-start`}
                    >
                        <Icon.UserPlus size={32} className="hover:text-white " />
                        <span className='text-base font-semibold'>Create New User</span>
                    </Button>
                </div>
            </form>
        </>
    )
}

export const EditUserModal = (props) => {
    const { userEdit } = props
    const [img, setImg] = useState('')
    const [isFormValidated, setIsFormValidated] = useState(false);
    const [form, setForm] = useState({
        id: userEdit.id,
        username: userEdit.username,
        password: '',
        fullname: userEdit.fullname,
        address: userEdit.fullname,
        email: userEdit.email,
        phone: userEdit.phone,
        role: userEdit.role_name,
        avatar: userEdit.avatar
    })
    const [formValidation, setFormValidation] = useState({
        usernameValidation: "loaded",
        passwordValidation: "loaded",
        fullnameValidation: "",
        emailValidation: "loaded",
        phoneValidation: "loaded"
    });
    const dispatch = useDispatch()
    const handleChangeFile = (e) => {
        if (e.target.files[0]) {
            setForm({
                ...form,
                [e.target.name]: e.target.files[0]
            })
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            setImg(reader.result);
            reader.onload = function (e) {
                setImg(e.target.result);
            };
        }
    }
    const checkExist = useCallback((email) => {
        axios({
            url: `http://localhost:7000/api/v1/check/email/${email}`,
            method: 'GET'
        })
            .then(res => {
                const emailRegex =
                    // eslint-disable-next-line no-useless-escape
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                const emailRegexCheck = email.match(emailRegex);
                if (email === '') {
                    setFormValidation({
                        ...formValidation,
                        emailValidation: 'warning',
                    });
                } else if (res.data?.length !== 0) {
                    setFormValidation({
                        ...formValidation,
                        emailValidation: 'error-existed',
                    });
                } else if (!emailRegexCheck) {
                    setFormValidation({
                        ...formValidation,
                        emailValidation: 'error-format',
                    });
                } else if (res.data?.length === 0 && emailRegexCheck) {
                    setFormValidation({
                        ...formValidation,
                        emailValidation: 'success',
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [formValidation])
    const checkExistUsername = useCallback((username) => {
        axios({
            url: `http://localhost:7000/api/v1/check/username/${username}`,
            method: 'GET'
        })
            .then(res => {
                if (res.data?.length !== 0) {
                    setFormValidation({
                        ...formValidation,
                        usernameValidation: 'error-existed',
                    });
                } else if (res.data?.length === 0) {
                    setFormValidation({
                        ...formValidation,
                        usernameValidation: 'success',
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [formValidation])
    const handleChange = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        // Check validation username
        if (e.target.name === 'username') {
            if (e.target.value.trim() === '') {
                setFormValidation({
                    ...formValidation,
                    usernameValidation: 'loaded',
                });
            } else {
                checkExistUsername(e.target.value.trim())
            }
        }
        // Check validation password
        if (e.target.name === 'password') {
            if (e.target.value.trim() === '') {
                setFormValidation({
                    ...formValidation,
                    passwordValidation: 'loaded',
                });
            } else {
                const passwordCheckResult = e.target.value.length >= 6;
                if (passwordCheckResult) {
                    setFormValidation({
                        ...formValidation,
                        passwordValidation: 'success',
                    });
                } else {
                    setFormValidation({
                        ...formValidation,
                        passwordValidation: 'error',
                    });
                }
            }
        }

        // Check validation fullname
        if (e.target.name === 'fullname') {
            if (e.target.value.trim() === '') {
                setFormValidation({
                    ...formValidation,
                    fullnameValidation: 'warning',
                });
            } else {
                setFormValidation({
                    ...formValidation,
                    fullnameValidation: 'success',
                });
            }
        }

        // Check validation email
        if (e.target.name === 'email') {
            if (e.target.value.trim() === '') {
                setFormValidation({
                    ...formValidation,
                    emailValidation: 'loaded',
                });
            } else {
                checkExist(e.target.value.trim())
            }
        }
        if (e.target.name === 'phone') {
            if (e.target.value.trim() === '') {
                setFormValidation({
                    ...formValidation,
                    phoneValidation: 'loaded',
                });
            } else {
                const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
                const phoneCheckResult = e.target.value.match(phoneRegex);
                if (phoneCheckResult) {
                    setFormValidation({
                        ...formValidation,
                        phoneValidation: 'success',
                    });
                } else {
                    setFormValidation({
                        ...formValidation,
                        phoneValidation: 'error-format',
                    });
                }
            }
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (e.target.password !== '') {
            setForm({
                ...form,
                [e.target.password]: form.password
            })
        }
        let formData = new FormData();
        for (let key in form) {
            if (key !== 'avatar') {
                formData.append(key, form[key])
            } else {
                if (formData.avatar !== null) {
                    formData.append('avatar', form.avatar)
                }
            }
        }
        dispatch(actionUserEdit(formData))
    }
    useEffect(() => {
        if (
            formValidation.usernameValidation === 'success' || formValidation.usernameValidation === 'loaded' &&
            formValidation.passwordValidation === 'success' ||
            formValidation?.passwordValidation === "loaded" &&
            formValidation.emailValidation === 'success' || formValidation.emailValidation === "loaded" && formValidation.phoneValidation === 'success' || formValidation.phoneValidation === 'loaded'
        ) {
            setIsFormValidated(true);
        } else {
            setIsFormValidated(false);
        }
    }, [formValidation.usernameValidation, formValidation.passwordValidation, formValidation.emailValidation, formValidation.phoneValidation])
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Username</Label>
                        <InputComponent type="text" name="username" value={form.username} onChange={handleChange} />
                    </div>
                    {formValidation &&
                        (formValidation['usernameValidation'] === 'success' ? (
                            <div className="label-success">This username address is valid.</div>
                        ) : formValidation['usernameValidation'] === 'warning' ? (
                            <div className="label-warning">Please input the username.</div>
                        ) : formValidation['usernameValidation'] === 'error-existed' ? (
                            <div className="label-error">
                                This username has been registered in the system. Please try another one.
                            </div>
                        ) : null)}
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Password</Label>
                        <InputComponent type="password" name="password" value={form.password || ''} onChange={handleChange} />
                    </div>
                    {formValidation &&
                        (formValidation['passwordValidation'] === 'success' ? (
                            <div className="label-success">This password is valid.</div>
                        ) : formValidation['passwordValidation'] === 'warning' ? (
                            <div className="label-warning">Please input the password.</div>
                        ) : formValidation['passwordValidation'] === 'error' ? (
                            <div className="label-error">Password must be greater than 6 characters.</div>
                        ) : null)}
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Full Name</Label>
                        <InputComponent type="text" name="fullname" value={form.fullname} onChange={handleChange} />
                    </div>
                    {formValidation && (formValidation['fullnameValidation'] === 'success' ? (
                        <div className="label-success">This fullname is valid.</div>
                    ) : formValidation['fullnameValidation'] === 'warning' ? (
                        <div className="label-warning">Please input the fullname.</div>
                    ) : null)}
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Address</Label>
                        <InputComponent type="text" name="address" value={form.address} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Email</Label>
                        <InputComponent type="email" name="email" value={form.email} onChange={handleChange} />
                    </div>
                    {formValidation &&
                        (formValidation['emailValidation'] === 'success' ? (
                            <div className="label-success">This email address is valid.</div>
                        ) : formValidation['emailValidation'] === 'warning' ? (
                            <div className="label-warning">Please input the email address.</div>
                        ) : formValidation['emailValidation'] === 'error-format' ? (
                            <div className="label-error">
                                This email has an invalid email address format. Please try again.
                            </div>
                        ) : formValidation['emailValidation'] === 'error-existed' ? (
                            <div className="label-error">
                                This email has been registered in the system. Please try another one.
                            </div>
                        ) : null)}
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Phone Number</Label>
                        <InputComponent type="phone" name="phone" value={form.phone} onChange={handleChange} />
                    </div>
                    {formValidation && formValidation && formValidation['phoneValidation'] === 'success' ? (
                        <div className="label-success">This phone number is valid.</div>
                    ) : formValidation['phoneValidation'] === 'error-format' ? (
                        <div className="label-error">
                            This email has an invalid email address format. Please try again.
                        </div>
                    ) : null}
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Role</Label>
                        <Select name="role" value={form.role} onChange={handleChange}>
                            <option defaultValue={'disabled'} >
                                {'Select user role'}
                            </option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option></Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Image Movie</Label>
                        <InputComponent type="file" name="avatar" onChange={handleChangeFile} />
                        <img style={{ width: 150, height: 150 }} src={img === '' ? form.avatar : img} />
                    </div>
                    <Button icon disabled={!isFormValidated}
                        className={`${isFormValidated ? `btn-primary` : `btn-disabled`} self-start sm:self-stretch lg:self-start`}
                    >
                        <Icon.Edit size={32} className="hover:text-white " />
                        <span className='text-base font-semibold'>Edit User</span>
                    </Button>
                </div>
            </form>
        </>
    )
}