import { ClipLoader } from "react-spinners"
import CinemaCard from "../CinameCard"

const CinemaList = (props) => {
    const { cinemas } = props
    return (
        <>
            <div className="flex flex-col gap-6">
                <div>
                    <p className="text-base font-semibold">List of cinema</p>
                </div>
                <div className="lg:p-6 lg:shadow-sm">
                    <table>
                        <thead>
                            <tr>
                                <th >Image</th>
                                <th >Name</th>
                                <th >Address</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-left">
                            {cinemas ? ((cinemas).map((cinema) => < CinemaCard key={cinema.id} cinema={cinema} />)) : (<tr>
                                <td rowSpan={3}>
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

export default CinemaList