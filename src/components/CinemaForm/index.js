import { useState } from "react"
import { Button } from "../Button"
import InputComponent from "../Input"
import Label from "../Label"
import * as Icon from 'react-feather';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCinemaAction, updateCinemaAction } from "../../redux/Action/ManagerCinemaAction";

export const CreateCinemaModal = () => {
    const [form, setForm] = useState({
        name_cinema: "",
        address: "",
        image: {}
    })
    const [img, setImg] = useState()
    const dispatch = useDispatch()
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
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        for (let key in form) {
            if (key !== "image") {
                formData.append(key, form[key])
            } else {
                formData.append('cinema', form.image)
            }
        }
        dispatch(createCinemaAction(formData))
    }
    const handleChange = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value.trim()
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal" >Name</Label>
                        <InputComponent type="text" name="name_cinema" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Address</Label>
                        <InputComponent type="text" name="address" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Image Cinema</Label>
                        <InputComponent type="file" name="image" onChange={handleChangeFile} />
                        <img style={{ width: 150, height: 150 }} src={img} />
                    </div>
                    <Button icon
                        className="btn-primary self-start sm:self-stretch lg:self-start"
                    >
                        <Icon.UserPlus size={32} className="hover:text-white " />
                        <span className='text-base font-semibold'>Create New Cinema</span>
                    </Button>
                </div>
            </form>
        </>
    )
}

export const EditCinemaModal = (props) => {
    const { cinemaProps } = props
    const history = useHistory()
    const [form, setForm] = useState({
        id: cinemaProps.id,
        name_cinema: cinemaProps.name_cinema,
        address: cinemaProps.address,
        image: cinemaProps.image
    })
    const [img, setImg] = useState('')
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
    const handleChange = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        for (let key in form) {
            if (key !== 'image') {
                formData.append(key, form[key])
            } else {
                if (formData.image !== null) {
                    formData.append('cinema', form.image)
                }
            }
        }
        dispatch(updateCinemaAction(formData, goToCinema))
    }
    const goToCinema = () => {
        window.location.reload()
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal" >Name</Label>
                        <InputComponent type="text" name="name_cinema" value={form.name_cinema} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Address</Label>
                        <InputComponent type="text" name="address" value={form.address} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Image Cinema</Label>
                        <InputComponent type="file" name="image" onChange={handleChangeFile} />
                        <img style={{ width: 150, height: 150 }} src={img === '' ? form.image : img} />
                    </div>
                    <Button icon
                        className="btn-primary self-start sm:self-stretch lg:self-start"
                    >
                        <Icon.Edit size={32} className="hover:text-white " />
                        <span className='text-base font-semibold'>Edit Cinema</span>
                    </Button>
                </div>
            </form>
        </>
    )
}
