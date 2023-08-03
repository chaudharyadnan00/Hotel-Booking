import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import axios from 'axios';
const divStyle = {

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '600px'
}

const Slideshow = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) return;
        axios.get('/places/' + id).then(response => {
            setPlace(response.data);
        })
    }, [id]);
    if (!place) return '';

    return (
        <div className="slide-container mt-2">
            <h1 className='text-xl font-bold text-center mb-1 text-black'>{place.title}</h1>
            <Slide>
                {place?.photos?.length > 0 &&
                    place.photos.map((photo, index) => (
                        <div key={index}>
                            <button onClick={()=>navigate(-1)} className="flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black absolute ml-3 mt-2 justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Close Photos
                            </button>
                            <div style={{ ...divStyle, 'backgroundImage': `url(${"http://localhost:4000/uploads/" + photo})` }}>
                                {/* <span style={spanStyle}>{place.title}</span> */}
                            </div>
                        </div>
                    ))}
            </Slide>
        </div>
    )
}
export default Slideshow;