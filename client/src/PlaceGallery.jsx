import {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function PlaceGallery({ place }) {
    // const [showAllPhotos, setShowAllPhotos] = useState(false);
    // if (showAllPhotos) {
    //     return (
    //         <Navigate to={"/place/slideshow/"+place._id}/>
    //         // <div className="absolute inset-0 bg-black text-white min-h-full flex flex-col">
    //         //     <div className="bg-black p-8 flex justify-between items-center fixed w-full">
    //         //         <h2 className="text-3xl mr-48">Photos of {place.title} </h2>
    //         //         <button onClick={() => setShowAllPhotos(false)} className="flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
    //         //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //         //                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    //         //             </svg>
    //         //             Close Photos
    //         //         </button>
    //         //     </div>
    //         //     <div className="overflow-y-auto mt-16">
    //         //         <div className="bg-black p-8 grid gap-4">
    //         //             {place?.photos?.length > 0 &&
    //         //                 place.photos.map((photo, index) => (
    //         //                     <div key={index}>
    //         //                         <img className="object-cover w-full" src={"http://localhost:4000/uploads/" + photo} alt="" />
    //         //                     </div>
    //         //                 ))
    //         //             }
    //         //         </div>
    //         //     </div>
    //         // </div>
    //     );
    // }
    return (
        <Link className="relative" to={"/place/slideshow/"+place._id}>
            <div className="flex gap-1 relative overflow-hidden rounded-3xl ">
                <div className="w-2/3 flex">
                    <img  src={"http://localhost:4000/uploads/" + place.photos[0]} alt="" className="cursor-pointer w-full h-auto aspect-square object-cover" />
                </div>

                <div className="w-1/3 overflow-hidden">
                    <div className="flex flex-col object-cover gap-1">
                        <div>
                            {place.photos?.[1] && (
                                <img  src={"http://localhost:4000/uploads/" + place.photos[1]} alt="" className="cursor-pointer w-full h-auto mb-4 aspect-square object-cover" />
                            )}
                        </div>
                        <div className="-mt-6 object-cover">
                            {place.photos?.[2] && (
                                <img  src={"http://localhost:4000/uploads/" + place.photos[2]} alt="" className="cursor-pointer w-full h-auto aspect-square object-cover relative top-2" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <button  className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>Show more photos</button>
        </Link>
    );
}