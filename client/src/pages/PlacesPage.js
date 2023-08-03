import { Link } from 'react-router-dom';
import AccountNav from '../AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceImg from '../PlaceImg';
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const PlacesPage = () => {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places', {
            headers: {
                'Authorization': 'Bearer ' + getCookie('token')
            }
        }).then(({ data }) => {
            setPlaces(data);
        })
    }, []);
    return (
        <div>
            <AccountNav />
            <div className="text-center">
                List of all places<br />
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                    Add new place
                </Link>
            </div>
            <div className='mt-4'>
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' + place._id} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4">
                        <div className="w-48">
                            <PlaceImg place={place} />
                        </div>
                        <div className="py-3 pr-3 grow">
                            <h2 className="text-xl mt-1 mb-1">
                                {place.title}
                            </h2>
                            <div className="text-lg mt-1 mb-1" >
                                {/* <BookingDates place={pla} className="mb-2 mt-2 text-gray-500" /> */}
                                <span className='text-lg'>
                                    Max number of guests: {place.maxGuests}
                                </span>
                                <div className="flex gap-1 mt-1 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    <span className="text-lg">
                                        Price: ${place.price} per night
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>


                ))}
            </div>
        </div >
    );
}
export default PlacesPage;
/* <Link to={'/account/places/' + place._id} className='cursor-pointer flex gap-6 bg-gray-100 p-4 rounded-2xl mt-2'>
                        <div className='flex w-50 h-32 bg-gray-300 grow shrink-0'>
                            <PlaceImg place={place} />
                        </div>
                        <div className='grow-0 shrink'>
                            <h className='text-xl'>{place.title}</h>
                            <p className='text-sm mt-2'>{place.description}</p>
                        </div>
                    </Link> */