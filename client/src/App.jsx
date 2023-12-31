import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from "./Layout";
import IndexPage from './pages/IndexPage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import PlacesPage from './pages/PlacesPage';
import PlacePage from './pages/PlacePage';
import PlacesFormPage from './pages/PlacesFormPage';
import BookingsPage from './pages/BookingsPage.jsx';
import BookingPage from './pages/BookingPage';
import Slideshow from './Slideshow';
// import Slideshow from './Slideshow';
axios.defaults.baseURL = process.env.PORT_URL;
const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPage/>} />
          <Route path='/account/places/new' element={<PlacesFormPage/>} />
          <Route path='/account/places/:id' element={<PlacesFormPage/>} />
          <Route path="/place/:id" element={<PlacePage/>}/>
          <Route path="/account/bookings" element={<BookingsPage/>} />
          <Route path="/account/bookings/:id" element={<BookingPage/>} />
          <Route path="/place/slideshow/:id" element={<Slideshow/>}/>
        </Route>
      </Routes>
    </UserContextProvider >
  );
}
export default App;
