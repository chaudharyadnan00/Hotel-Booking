import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const BookingPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get('/bookings', {
                headers: {
                    'Authorization': 'Bearer ' + getCookie('token')
                }
            }).then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            })
        }
    }, [id]);
    if (!booking) {
        return '';
    }
    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink>{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-xl">Your booking information</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 my-6 text-white rounded-2xl h-20 mb-3 py-3">
                    <div>
                        Total price:
                    </div>
                    <div className="text-2xl mb-4">
                        ${booking.price}
                    </div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    );
}
export default BookingPage;