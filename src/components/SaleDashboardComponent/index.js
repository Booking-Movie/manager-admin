import Select from "../Select"
import * as Icon from 'react-feather';
import { Button } from "../Button";
import moment from "moment";
import { useState } from "react";
import { SaleMovie, SaleMovieList } from "../SaleMovie";
import { SaleCinema } from "../SaleCinema";

export const DashboardList = (props) => {
    const { ticket, onSearchSubmit, handleSortData, saleMovie } = props
    console.log("🚀 ~ file: index.js ~ line 11 ~ DashboardList ~ saleMovie", saleMovie)
    const [value, setValue] = useState()
    const [date, setDate] = useState({
        start_date: "",
        end_date: "",
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        onSearchSubmit(date, value)
    }
    const dateNow = Date()
    const handleFilterDataOption = async (event) => {
        await handleSortData(event.target.value)
        setValue(event.target.value)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setDate({
            ...date,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div className='flex flex-row sm:flex-col md:flex-col lg:flex-col xl:flex-row gap-6 mb-7 '>

                <div className='flex items-center gap-x-5 w-full'>
                    <span><Icon.Activity size={32} /></span>
                    <h1 className='sm:text-2xl'>Activity {moment(dateNow).format('MMM Do YY')}</h1>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-row sm:flex-col gap-6 w-full justify-end  md:justify-start lg:justify-start lg:items-center xl:justify-end'>
                    <div className='flex flex-row sm:flex-col items-center gap-4 '>
                        <div className="flex flex-row sm:flex-col gap-2 w-full">
                            <input
                                type="date"
                                className="self-stretch border-2 font-semibold rounded-lg p-[18px] "
                                aria-label="Search"
                                name='start_date'
                                onChange={handleChange}
                                aria-describedby="button-addon2"
                            />
                        </div>
                        <span><Icon.ArrowRight size={32} /></span>
                        <div className="flex flex-row sm:flex-col gap-2 w-full">
                            <input
                                type="date"
                                className="self-stretch border-2 font-semibold rounded-lg p-[18px]"
                                aria-label="Search"
                                name='end_date'
                                onChange={handleChange}
                                aria-describedby="button-addon2"
                            />
                        </div>
                        <Button icon className='btn-primary self-start sm:self-stretch lg:self-start'>
                            <span><Icon.Search size={32} /></span><p>Search</p>
                        </Button>
                    </div>
                </form>
                <Select className='self-stretch border-2 font-semibold rounded-lg p-[18px]' onChange={handleFilterDataOption}>
                    {/* <option defaultValue={'disabled'} >
                        {'Select sale'}
                    </option> */}
                    <option value="cinema">Sale For Cinema</option>
                    <option value="movie">Sale For Movie</option>
                </Select>
            </div>
            {value === "movie" ? (<SaleMovie movies={saleMovie} />) : (<SaleCinema ticket={ticket} />)}
        </>
    )
}