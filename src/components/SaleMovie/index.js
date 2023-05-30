import * as Icon from 'react-feather';
import { BarChart, PieChart } from '../Chart';
import SaleCinemaList from '../SaleCinemaList';

export const SaleMovie = (props) => {
    const { movies } = props
    return (
        <>
            <div className='flex gap-5 sm:flex-col md:flex-col lg:flex-col xl:flex-row '>
                <div className='flex gap-5 sm:flex-col md:flex-col lg:flex-col w-full'>
                    <div className="grid grid-cols-12 gap-4 mb-6">
                        <div className='h-auto p-6 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 rounded-md bg-[#00C9A7] text-white'>
                            <div className='flex items-center '>
                                <div className='mr-10'>
                                    <Icon.BarChart size={32} className="hover:text-white" />
                                </div>
                                <div>
                                    <h2>Sales Amount</h2>
                                    <p className='text-xl font-semibold'> {movies?.reduce((total, price) => {
                                        return (total += price.total_price)
                                    }, 0)}
                                        $</p>
                                </div>
                            </div>
                        </div>
                        <div className='h-auto p-6 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 rounded-md bg-[#0081CF]  text-white'>
                            <div className='flex items-center'>
                                <div className='mr-10'>
                                    <Icon.ShoppingCart size={32} className="hover:text-white " />
                                </div>
                                <div>
                                    <h2>Available Ticket</h2>
                                    <p className='text-xl font-semibold'> {movies?.reduce((total, price) => {
                                        return (total += price.total_booking)
                                    }, 0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-6'>
                        <div className='border-2 w-full border-slate-200'>
                            <h1 className='border-b-2 p-2 border-slate-200'>Statistics of ticket over time</h1>
                            <div className='ml-0 p-4'>
                                <BarChart data={movies} />
                            </div>
                        </div>
                        <div className='border-2 w-full border-slate-200'>
                            <h1 className='border-b-2 p-2 border-slate-200'>Statistics of sales over time</h1>
                            <div className='ml-0 p-2'>
                                <PieChart data={movies} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-auto w-full'>
                    <div className='border-2 w-full border-slate-200  '>
                        <h1 className='border-b-[1px] w-full p-6 border-slate-200'>Top 10 Selling Movie</h1>
                        <SaleCinemaList sale={movies} />
                        {/* <Pagination
                        items={ticket}
                        currentItems={currentItems}
                        itemOffset={itemOffset}
                        pageCount={pageCount}
                        handlePaginationClick={handlePaginationClick}
                        handlePageClick={handlePageClick}
                    /> */}
                        {/* {topMovie?.map((movie) => {
                        return <div className='flex items-center gap-x-4 border-b-[1px] p-6'>
                            <img src={movie.image_movie} className="w-24 sm:w-20 rounded-md" />
                            <h2 className='sm:text-base w-full'>{movie.name_movie}</h2>
                            <h2 className='sm:text-base text-right'> ${movie.total_sale_movie}</h2>
                        </div>
                    })} */}
                    </div>
                </div>
            </div >
        </>
    )
}