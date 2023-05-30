import OrderCard from "../SaleCinemaCard"
import { ClipLoader } from "react-spinners"
import SaleCinemaCard from "../SaleCinemaCard"
const SaleCinemaList = (props) => {
    const { sale } = props
    return (
        <div className="flex flex-col gap-6 p-4">

            <div className="lg:p-6 lg:shadow-sm">
                <table>
                    <thead>
                        <tr className="lg:rounded-r-none text-center">
                            <th >Name</th>
                            <th >Total Booking</th>
                            <th >Total Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-left">
                        {sale ? ((sale).map((item, index) => < SaleCinemaCard key={index} sales={item} />)) : (<tr>
                            <td rowSpan={7}>
                                <ClipLoader />
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SaleCinemaList