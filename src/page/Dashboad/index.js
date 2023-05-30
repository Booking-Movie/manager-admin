import axios from 'axios';
import moment from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react'
import { DashboardList } from '../../components/SaleDashboardComponent';
// import { SaleCinemaList } from '../../components/SaleCinemaList';

const Dashboard = () => {
    const [ticket, setTicket] = useState()
    const [valueFilter, setFilterValue] = useState()
    const [saleMovie, setSaleMovie] = useState()
    console.log("🚀 ~ file: index.js ~ line 10 ~ Dashboard ~ valueFilter", valueFilter)
    const submitSearch = useCallback(async (date) => {
        console.log("🚀 ~ file: index.js ~ line 10 ~ submitSearch ~ date", date)
        if (valueFilter === "cinema" || valueFilter === undefined) {
            const fetchSearchData = () => {
                axios({
                    url: `http://localhost:7000/api/v1/sale/find-all-sale`,
                    method: 'POST',
                    data: date
                })
                    .then(res => {
                        setTicket(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            fetchSearchData()
        } else if (valueFilter === "movie") {
            const fetchSearchData = () => {
                axios({
                    url: `http://localhost:7000/api/v1/sale/find-all-sale-movie`,
                    method: 'POST',
                    data: date
                })
                    .then(res => {
                        setSaleMovie(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            fetchSearchData()
        }

    }, [valueFilter])
    const handleSortData = useCallback((filter) => {
        setFilterValue(filter)
        if (filter === 'movie') {
            const fetchMovie = () => {
                axios({
                    url: `http://localhost:7000/api/v1/sale/find-all-sale-movie`,
                    method: 'GET'
                })
                    .then(res => {
                        setSaleMovie(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            fetchMovie()
        }
    }, [])
    useEffect(() => {
        const fetchMovie = () => {
            axios({
                url: `http://localhost:7000/api/v1/sale/find-all-sale-booking`,
                method: 'GET'
            })
                .then(res => {
                    setTicket(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchMovie()
    }, [])
    console.log("🚀 ~ file: index.js ~ line 66 ~ Dashboard ~ saleMovie", saleMovie)
    return (
        <div className='below-navigation-bar max-w-[1700px] mx-auto p-5'>
            <DashboardList ticket={ticket} saleMovie={saleMovie} handleSortData={handleSortData} onSearchSubmit={submitSearch} />
        </div >
    )
}

export default Dashboard
