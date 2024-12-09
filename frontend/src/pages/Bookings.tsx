import BookingList from "../components/Booking/BookingList";

const Bookings = () => {
    return (
        <>
            <div className="page-content-header">
                <p className="page-content-header-title">Your Bookings</p>
            </div>
            <BookingList />
        </>
    )
}

export default Bookings;