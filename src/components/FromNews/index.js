import { Button } from "../Button"
import InputComponent from "../Input"
import Label from "../Label"
import Select from "../Select"
import * as Icon from 'react-feather';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewAction, updateNewAction } from "../../redux/Action/ManagerActionNew";
import TextareaComponent from "../TextArea";

export const CreateNewModal = () => {
    const [img, setImg] = useState('')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.ManagerAuthReducer.userLogin)
    console.log("🚀 ~ file: index.js ~ line 15 ~ CreateNewModal ~ userLogin", userLogin.payload.role)
    const [from, setFrom] = useState({
        new_title: "",
        new_introduction: "",
        new_body: "",
        new_conclusion: "",
        new_image: {},
        type_id: "",
        user_id: userLogin.payload.id,
    })

    const handleChange = (e) => {
        setFrom(({
            ...from,
            [e.target.name]: e.target.value.trim()
        }))
    }
    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/jpeg') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImg(e.target.result)
            }
        }
        setFrom({
            ...from,
            [e.target.name]: file
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        for (let key in from) {
            if (key !== "new_image") {
                formData.append(key, from[key])
            } else {
                formData.append('news', from.new_image)
            }
        }
        dispatch(createNewAction(formData, goNew))

    }
    const goNew = () => {
        window.location.reload()
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Title</Label>
                        <InputComponent type="textarea" name="new_title" onChange={handleChange} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Introduction</Label>
                        <TextareaComponent type="textarea" name="new_introduction" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Body</Label>
                        <TextareaComponent type="textarea" name="new_body" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Conclusion</Label>
                        <TextareaComponent type="textarea" name="new_conclusion" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Status</Label>
                        <Select name="type_id" defaultValue={'disabled'} onChange={handleChange}>
                            <option disabled value={'disabled'}>
                                {'Select status'}
                            </option>
                            <option value="1">Discount</option>
                            <option value="2">Movie</option>
                            <option value="3">Recruit</option>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Image Movie</Label>
                        <InputComponent type="file" name="new_image" onChange={handleChangeFile} />
                        <img style={{ width: 150, height: 150 }} src={img} />
                    </div>
                    <Button icon
                        className="btn-primary self-start sm:self-stretch lg:self-start"
                    >
                        <Icon.UserPlus size={32} className="hover:text-white " />
                        <span className='text-base font-semibold'>Create New</span>
                    </Button>
                </div>
            </form>
        </>
    )
}


export const EditNewsModal = (props) => {
    const { newInfo } = props
    const [img, setImg] = useState('')
    const dispatch = useDispatch()
    const [from, setFrom] = useState({
        new_id: newInfo.new_id,
        new_title: newInfo.new_title,
        new_introduction: newInfo.new_introduction,
        new_body: newInfo.new_body,
        new_conclusion: newInfo.new_conclusion,
        new_image: newInfo.new_image,
        type_id: newInfo.type_id,
        type_name: newInfo.type_name,
    })

    const handleChange = (e) => {
        e.preventDefault()
        setFrom(({
            ...from,
            [e.target.name]: e.target.value
        }))
    }
    const handleChangeFile = (e) => {
        if (e.target.files[0]) {
            setFrom({
                ...from,
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
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        for (let key in from) {
            if (key !== "new_image") {
                formData.append(key, from[key])
            } else {
                if (formData.new_image !== null) {
                    formData.append('news', from.new_image)
                }
            }
        }
        dispatch(updateNewAction(formData))
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Title</Label>
                        <TextareaComponent type="text" name="new_title" value={from.new_title} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Introduction</Label>
                        <TextareaComponent value={from.new_introduction} type="text" name="new_introduction" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Body</Label>
                        <TextareaComponent value={from.new_body} type="text" name="new_body" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Conclusion</Label>
                        <TextareaComponent value={from.new_conclusion} type="text" name="new_conclusion" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Status</Label>
                        <Select value={from.type_id} defaultValue={from.type_name} name="type_id" onChange={handleChange}>
                            <option disabled value={'disabled'}>
                                {'Select status'}
                            </option>
                            <option value="1">Discount</option>
                            <option value="2">Movie</option>
                            <option value="3">Recruit</option>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Image Movie</Label>
                        <InputComponent type="file" name="new_image" onChange={handleChangeFile} />
                        <img style={{ width: 150, height: 150 }} src={img === '' ? from.new_image : img} />
                    </div>
                    <Button icon
                        className="btn-primary self-start sm:self-stretch lg:self-start"
                    >
                        <Icon.Edit size={32} className="hover:text-white " />
                        <span className='text-base font-semibold'>Edit New</span>
                    </Button>
                </div>
            </form>
        </>
    )
}