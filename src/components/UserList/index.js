import { memo } from "react"
import { ClipLoader } from "react-spinners"
import UserCard from "../UserCard"

const UserList = (props) => {
    const { userList } = props
    return (
        <>
            <div className="flex flex-col gap-6">
                <div>
                    <p className="text-base font-semibold">List of users</p>
                </div>
                <div className="lg:p-6 lg:shadow-sm">
                    <table>
                        <thead>
                            <tr>
                                <th >Avatar</th>
                                <th >Username</th>
                                <th >Email</th>
                                <th >Phone</th>
                                <th >Role</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-left">
                            {userList ? ((userList).map((users) => < UserCard key={users.id} user={users} />)) : (<tr>
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

export default memo(UserList)