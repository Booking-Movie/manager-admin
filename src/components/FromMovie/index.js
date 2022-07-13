import { Button } from "../Button"
import InputComponent from "../Input"
import Label from "../Label"
import Select from "../Select"
import * as Icon from 'react-feather';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMovie, createShowTimeAction, getAllMoviesAction, updateMovieAction } from "../../redux/Action/ManagerMovieAction";
import { createMovieCinemaAction, getAllCinemaAction } from "../../redux/Action/ManagerCinemaAction";
import { createActorDirectorAction, getAllActorAction, getAllDirectorAction } from "../../redux/Action/ManagerActorAction";
import { MultiSelect } from "react-multi-select-component";
import { InfoActor } from "../../_core/model/user";

export const CreateMovieModal = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { actorList, directorList } = useSelector(state => state.ManagerActorReducer)
    console.log("🚀 ~ file: index.js ~ line 17 ~ CreateMovieModal ~ actorList", actorList, directorList)
    const [from, setFrom] = useState({
        name_movie: "",
        comming_data: "",
        des_movie: "",
        trailer: "",
        time_show: "",
        nation: "",
        director: "",
        status_movie: "",
        evaluate: "",
        image_movie: {}
    })
    const [img, setImg] = useState('')
    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        let fileName = e.target.files[0].name
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
    const handleChange = (e) => {
        e.preventDefault()
        setFrom({
            ...from,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("This is form", from)
        let fromData = new FormData();
        for (let key in from) {
            if (key !== "image_movie") {
                fromData.append(key, from[key])
            } else {
                fromData.append('movie', from.image_movie)
            }
        }
        // dispatch(createMovie(fromData, goToMovie))
    }
    const goToMovie = () => {
        history.go(0)
    }
    useEffect(() => {
        dispatch(getAllActorAction())
        dispatch(getAllDirectorAction())
    }, [])
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Movie Name</Label>
                        <InputComponent type="text" name="name_movie" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Trailer</Label>
                        <InputComponent type="text" name="trailer" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Description</Label>
                        <InputComponent type="text" name="des_movie" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Date</Label>
                        <InputComponent format={"DD/MM/YYYY"} type="date" name="comming_data" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Nation</Label>
                        <InputComponent type="text" name="nation" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Time</Label>
                        <InputComponent type="number" name="time_show" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Director</Label>
                        <InputComponent type="text" name="director" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Status</Label>
                        <Select name="status_movie" defaultValue={'disabled'} onChange={handleChange}>
                            <option disabled value={'disabled'}>
                                {'Select status'}
                            </option>
                            <option value="NowShowing">Now Showing</option>
                            <option value="CommingSoon">Comming Soon</option></Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Evaluate</Label>
                        <InputComponent type="number" name="evaluate" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Image Movie</Label>
                        <InputComponent type="file" name="image_movie" onChange={handleChangeFile} />
                        <img style={{ width: 150, height: 150 }} src={img} />
                    </div>
                    <Button icon
                        className="btn-primary self-start sm:self-stretch lg:self-start"
                    >
                        <Icon.UserPlus size={32} className="hover:text-white " />
                        <span className='text-base font-semibold'>Create New Movie</span>
                    </Button>
                </div>
            </form>
        </>
    )
}

export const EditMovieModal = (props) => {
    const { movie } = props
    const dispatch = useDispatch()
    const history = useHistory()
    const [form, setForm] = useState({
        id: movie.id,
        name_movie: movie.name_movie,
        comming_data: movie.comming_data,
        des_movie: movie.des_movie,
        trailer: movie.trailer,
        nation: movie.nation,
        director: movie.director,
        status_movie: movie.status_movie,
        evaluate: movie.evaluate,
        image_movie: movie.image_movie
    })
    const [img, setImg] = useState('')
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
            if (key !== 'image_movie') {
                formData.append(key, form[key])
            } else {
                if (formData.image_movie !== null) {
                    formData.append('movie', form.image_movie)
                }
            }
        }
        dispatch(updateMovieAction(formData, goToMovie))
    }
    const goToMovie = () => {
        history.go(0)
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Movie Name</Label>
                        <InputComponent type="text" name="name_movie" value={form.name_movie} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Trailer</Label>
                        <InputComponent type="text" name="trailer" value={form.trailer} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Description</Label>
                        <InputComponent type="text" name="des_movie" value={form.des_movie} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Date</Label>
                        <InputComponent type="date" name="comming_data" value={form.comming_data} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Nation</Label>
                        <InputComponent type="text" name="nation" value={form.nation} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Director</Label>
                        <InputComponent type="text" name="director" value={form.director} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Status</Label>
                        <Select name="status_movie" value={form.status_movie} onChange={handleChange}>
                            <option disabled value={'disabled'} >
                                {'Select status'}
                            </option>
                            <option value="Now Showing">Now Showing</option>
                            <option value="Comming Soon">Comming Soon</option></Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Evaluate</Label>
                        <InputComponent type="number" name="evaluate" value={form.evaluate} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Image Movie</Label>
                        <InputComponent type="file" name="image_movie" onChange={handleChangeFile} />
                        <img style={{ width: 150, height: 150 }} src={img === '' ? form.image_movie : img} />
                    </div>
                    <Button icon
                        className="btn-primary self-start sm:self-stretch lg:self-start"
                    >
                        <Icon.UserPlus size={32} className="hover:text-white " />
                        <span className='text-base font-semibold'>Edit Movie</span>
                    </Button>
                </div>
            </form>
        </>
    )
}

export const CreateShowTimeModal = (props) => {
    console.log("🚀 ~ file: index.js ~ line 244 ~ CreateShowTimeModal ~ props", props)
    const { movie } = props
    const dispatch = useDispatch()
    const history = useHistory()
    const { cinemaList } = useSelector(state => state.ManagerCinemaReducer)
    const [state, setState] = useState({
        code_theater: '',
        time_start: '',
        start_date: '',
        movie_id: movie.id,
        cinema_id: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("This is state", state)
        dispatch(createShowTimeAction(state, goMovie))
    }
    const goMovie = () => {
        history.go(0)
    }

    const handleChange = async (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        dispatch(getAllCinemaAction())
    }, [dispatch])
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className='flex flex-col gap-5 justify-center items-center'>
                        {movie.image_movie ? (<img src={movie.image_movie} className="rounded-[50%] w-24 h-24" alt='Avarta Here' />) : (<img src='/default-avatar.png' className="rounded-[50%] w-24 h-24" alt='Avarta Here' />)}
                        <h1 className='text-2xl font-semibold'>{movie.name_movie}</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Select Cinema</Label>
                        <Select onChange={handleChange} name="cinema_id" placeholder="Select cinema">
                            < option defaultValue={'disabled'} >
                                {'Select cinema'}
                            </option>
                            {cinemaList.map((cinema, index) => {
                                return (
                                    <>
                                        <option key={index} value={cinema.id}>{cinema.name_cinema}</option>
                                    </>

                                )
                            })}
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal" >Code Theater</Label>
                        <InputComponent type="text" name="code_theater" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Start Date</Label>
                        <InputComponent type="date" name="start_date" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Start Time</Label>
                        <InputComponent type="time" name="time_start" onChange={handleChange} />
                    </div>
                    <Button icon
                        className="btn-primary self-start sm:self-stretch lg:self-start"
                    >
                        <Icon.UserPlus size={32} className="hover:text-white " />
                        <span className='text-base font-semibold'>Create Show Time</span>
                    </Button>
                </div>
            </form>
        </>
    )
}


// export const CreateActorAndDirector = () => {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const [selectActor, setSelectActor] = useState([])
//     const [selectDirector, setSelectDirector] = useState([])
//     const { actorList, directorList } = useSelector(state => state.ManagerActorReducer)
//     useEffect(() => {
//         dispatch(getAllActorAction())
//         dispatch(getAllDirectorAction())
//     }, [])
//     const handleSubmit = (e) => {
//         e.preventDefault()
//     }
//     return (
//         <>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//                 <div className="flex flex-col gap-4">
//                     <div className="flex flex-col gap-2">
//                         <Label size="text-normal">Actor</Label>
//                         {/* <MultiSelect value={selectActor} onChange={setSelectActor} options={actorList.map((item) => {
//                             const label = item.name_actor
//                             const value = item.id
//                             return { label, value }
//                         })} /> */}
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <Label size="text-normal">Director</Label>
//                         <MultiSelect value={selectDirector} onChange={setSelectDirector} />
//                     </div>
//                     <Button icon
//                         className="btn-primary self-start sm:self-stretch lg:self-start"
//                     >
//                         <Icon.UserPlus size={32} className="hover:text-white " />
//                         <span className='text-base font-semibold'>Create Movie Cinema</span>
//                     </Button>
//                 </div>
//             </form>
//         </>
//     )
// }


// export const CreateMovieForCinema = () => {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const { cinemaList } = useSelector(state => state.ManagerCinemaReducer)
//     const { movieList } = useSelector(state => state.ManagerMovieReducer)
//     const [form, setForm] = useState({
//         movie_id: "",
//         cinema_id: ""
//     })

//     useEffect(() => {
//         dispatch(getAllCinemaAction())
//         dispatch(getAllMoviesAction())
//     }, [dispatch])

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         dispatch(createMovieCinemaAction(form, goToMovie))
//         console.log("🚀 ~ file: index.js ~ line 333 ~ handleSubmit ~ form", form)
//     }
//     const goToMovie = () => {
//         history.go(0)
//     }
//     const handleChange = (e) => {
//         e.preventDefault()
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         })
//     }
//     return (
//         <>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//                 <div className="flex flex-col gap-4">
//                     <div className="flex flex-col gap-2">
//                         <Label size="text-normal">Movie</Label>
//                         <Select onChange={handleChange} name="movie_id">
//                             <option defaultValue={'disabled'} >
//                                 {'Select movie system'}
//                             </option>
//                             {movieList.map((movie, index) => {
//                                 return (
//                                     <>
//                                         <option key={index} value={movie.id}>{movie.name_movie}</option>
//                                     </>

//                                 )
//                             })}
//                         </Select>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <Label size="text-normal">Cinema</Label>
//                         <Select onChange={handleChange} name="cinema_id" placeholder="Select cinema">
//                             < option defaultValue={'disabled'} >
//                                 {'Select cinema'}
//                             </option>
//                             {cinemaList.map((cinema, index) => {
//                                 return (
//                                     <>
//                                         <option key={index} value={cinema.id}>{cinema.name_cinema}</option>
//                                     </>

//                                 )
//                             })}
//                         </Select>
//                     </div>
//                     <Button icon
//                         className="btn-primary self-start sm:self-stretch lg:self-start"
//                     >
//                         <Icon.UserPlus size={32} className="hover:text-white " />
//                         <span className='text-base font-semibold'>Create Movie Cinema</span>
//                     </Button>
//                 </div>
//             </form>
//         </>
//     )
// }




export const CreateMovieForCinema = (props) => {
    console.log("🚀 ~ file: index.js ~ line 454 ~ CreateMovieForCinema ~ props", props.movie.id)
    const dispatch = useDispatch()
    const history = useHistory()
    const movie_id = props.movie.id
    console.log("🚀 ~ file: index.js ~ line 458 ~ CreateMovieForCinema ~ movie_id", movie_id)
    const [selectActor, setSelectActor] = useState([])
    const [selectDirector, setSelectDirector] = useState([])
    const { actorList, directorList } = useSelector(state => state.ManagerActorReducer)
    useEffect(() => {
        dispatch(getAllActorAction())
        dispatch(getAllDirectorAction())
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const fromActor = new InfoActor()
        fromActor.movie_id = movie_id
        fromActor.actorList = selectActor
        fromActor.directorList = selectDirector
        dispatch(createActorDirectorAction(fromActor, goToMovie))
    }
    const goToMovie = () => {
        window.location.reload()
    }
    useEffect(() => {
    }, [dispatch])
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Actor</Label>
                        <MultiSelect value={selectActor} onChange={setSelectActor} options={actorList.map((item) => {
                            const label = item.name_actor
                            const value = item.id
                            return { label, value }
                        })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label size="text-normal">Director</Label>
                        <MultiSelect value={selectDirector} onChange={setSelectDirector} options={directorList.map((item) => {
                            const label = item.name_director
                            const value = item.id
                            return { label, value }
                        })} />
                    </div>
                    <Button icon
                        className="btn-primary self-start sm:self-stretch lg:self-start"
                    >
                        <Icon.UserPlus size={32} className="hover:text-white " />
                        <span className='text-base font-semibold'>Create Actor And Directer</span>
                    </Button>
                </div>
            </form>
        </>
    )
}



// https://www.npmjs.com/package/react-multi-select-component
