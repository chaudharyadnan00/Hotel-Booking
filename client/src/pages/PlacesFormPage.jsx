import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import Perks from "../Perks";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const PlacesFormPage = () => {
    const { id } = useParams();
    console.log({id});
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price,setPrice]=useState(100);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) return;
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    const inputHeader = (text) => {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        );
    }
    const inputDescription = (text) => {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>

        );
    }
    const preInput = (header, description) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    const savePlace = async (ev) => {
        ev.preventDefault();

        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,price
        }

        if (id) {
            axios.put('/places', {
                id, ...placeData,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + getCookie('token')
                }
            });
            setRedirect(true);
        }
        else {
            const { data } = await axios.post('/places', placeData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + getCookie('token')
                    }
                });
            console.log(data);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }
    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place. Should be short and catchy as in advertisement')}
                <input
                    type="text"
                    value={title}
                    onChange={(ev) => { setTitle(ev.target.value) }}
                    placeholder="title, for example: My lovely apartment" />

                {preInput('Address', 'Address to this place')}
                <input
                    type="text"
                    value={address}
                    onChange={(ev) => { setAddress(ev.target.value) }}
                    placeholder="address" />

                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'description of the place')}
                <textarea
                    value={description}
                    onChange={(ev) => { setDescription(ev.target.value) }} />

                {preInput('Perks', 'select all perks of your place')}
                <div className='mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {preInput('Extra info', 'house rules, etc.')}
                <textarea value={extraInfo}
                    onChange={(ev) => { setExtraInfo(ev.target.value) }} />

                {preInput('Check in&out times', 'add check in&out times, remember to have sometime window for cleaning the room between guests')}
                <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>

                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input
                            type='text'
                            value={checkIn}
                            onChange={(ev) => { setCheckIn(ev.target.value) }}
                            placeholder='14:00' />
                    </div>

                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input
                            type='text'
                            value={checkOut}
                            onChange={(ev) => { setCheckOut(ev.target.value) }}
                            placeholder='11:00' />
                    </div>

                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input
                            type='number'
                            value={maxGuests}
                            onChange={(ev) => { setMaxGuests(ev.target.value) }}
                        />
                    </div>

                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input
                            type='number'
                            value={price}
                            onChange={(ev) => { setPrice(ev.target.value) }}
                        />
                    </div>

                </div>
                <div>
                    <button className='primary my-4'>Save</button>
                </div>

            </form>
        </div>
    );
}
export default PlacesFormPage;