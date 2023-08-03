const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const path = require('path');
const multer = require('multer');
const fs = require('fs');


require('dotenv').config();
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';



app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000',
    }
));



// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("mongodb connected");
}).catch((err) => {
    console.log(err);
    console.log("mongodb connection failed");
});



app.get('/test', (req, res) => {
    res.json('test ok');
});



//Registeration purpose
app.post('/register', async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            res.status(422).json({ error: "Email already exists" });
        }
        const userDoc = await User.create({
            name,
            username,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    }
    catch (e) {
        res.status(422).json(e);
        //Unprocessable entity
    }
});



// Login purpose
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
                // console.log(token);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});







// Most important code regarding cookies
app.get('/profile', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1] || '';
    // res.json(token);
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, username, email, _id } = await User.findById(userData.id);
            res.json({ name, username, email, _id });
        });
    }
    else {
        res.json(null);
    }
});


app.post('/logout', (req, res) => {
    res.clearCookie('token').json(true);
});

// console.log(__dirname);
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const destinationPath = path.join(__dirname, 'uploads', newName);
    await imageDownloader.image({
        url: link,
        dest: destinationPath,
    });
    res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        if (!originalname) {
            console.log("Original name missing for file ", i);
            continue;
        }
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        // uploadedFiles.push(newPath.replace('uploads/',''));
        const relativePath = newPath.replace('uploads\\', '');
        uploadedFiles.push(relativePath);
    }
    res.json(uploadedFiles);
    // res.json(files);
});


app.post('/places', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1] || '';
    const { title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create(
            {
                owner: userData.id,
                title, address, photos: addedPhotos,
                description, perks, extraInfo, checkIn,
                checkOut, maxGuests, price
            });
        res.json(placeDoc);
    });
});

app.get('/user-places', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1] || '';
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1] || '';
    const { id, title, address,
        addedPhotos, description, perks,
        extraInfo, checkIn, checkOut,
        maxGuests, price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set(
                {
                    title, address, photos: addedPhotos,
                    description, perks, extraInfo, checkIn,
                    checkOut, maxGuests, price
                });
            await placeDoc.save();
            res.json('ok');
        }
    });
})

app.get('/places', async (req, res) => {
    res.json(await Place.find());
});

app.post('/bookings', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1] || '';
    const { place, checkIn, checkOut,
        name, phone, price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const bookingDoc = await Booking.create({
            place, user: userData.id, checkIn, checkOut,
            name, phone, price
        });
        res.json(bookingDoc);
    });
});

app.get('/bookings', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1] || '';
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = userData;
        res.json(await Booking.find({ user: id }).populate('place'));
    });
});

const PORT = process.env.PORT;
app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
});