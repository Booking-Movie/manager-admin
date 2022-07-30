import { ClipLoader } from "react-spinners"
import NewsCard from "../NewsCard"
const NewsList = (props) => {
    const { news } = props
    return (
        <div className="flex flex-col gap-6">
            <div>
                <p className="text-base font-semibold">List of news</p>
            </div>
            <div className="lg:p-6 lg:shadow-sm ">
                <table>
                    <thead>
                        <tr>
                            <th >Image</th>
                            <th >Title</th>
                            <th>Introduction</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-left mb-4">
                        {news ? ((news).map((news) => < NewsCard key={news.new_id} news={news} />)) : (<tr>
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

export default NewsList