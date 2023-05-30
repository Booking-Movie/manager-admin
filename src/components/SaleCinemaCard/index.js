const SaleCinemaCard = (props) => {
    const { sales } = props

    return (
        <>
            <tr className="user-card border-2 text-center">
                <td >
                    <span>Name</span>
                    {sales?.name_cinema}
                </td>
                <td >
                    <span>Total Booking</span>
                    {sales?.total_booking}
                </td>
                <td >
                    <span>Total Price</span>
                    {sales?.total_price}$
                </td>
            </tr>
        </>
    )
}

export default SaleCinemaCard