import { ClipLoader } from "react-spinners"
import MovieCard from "../MovieCard"

const MovieList = (props) => {
    const { movies } = props
    return (
        <>
            <div className="flex flex-col gap-6">
                <div>
                    <p className="text-body font-semi-bold">List of movie</p>
                </div>
                <div className="lg:p-6 lg:shadow-sm">
                    <table>
                        <thead>
                            <tr>
                                <th >Image</th>
                                <th >Name</th>
                                <th >Description</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-left mb-4">
                            {movies ? ((movies).map((movie) => < MovieCard key={movie.id} movie={movie} />)) : (<tr>
                                <td rowSpan={7}>
                                    <ClipLoader />
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MovieList