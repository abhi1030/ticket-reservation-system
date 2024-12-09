import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleBooking from "../components/Booking/SingleBooking";
import { getBookingInfo, BookingInfo } from "../hooks/booking";
import LoadingSpinner from "../components/loaders/LoadingSpinner";

const SingleBookingPage = () => {
    const { bookingId } = useParams();
    const [bookingInfo, setBookingInfo] = useState<BookingInfo>();

    useEffect(() => {
        if (bookingId) {
            getBookingInfo(bookingId)
                .then((data) => {
                    setBookingInfo(data);
                })
                .catch((error) => console.log(error));
        }
    }, [bookingId]);

    return (
        <>
            {bookingInfo ? <SingleBooking bookingInfo={bookingInfo} /> : <LoadingSpinner />}
        </>
    );
};

export default SingleBookingPage;
