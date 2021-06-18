const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const uploadRouter = require('./routes/uploads');
const productRouter = require('./routes/productRoutes');
const paymentRouter = require('./routes/paymentRoute');
const shopRouter = require('./routes/shopRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    // tempFileDir: '/tmp/'
}));

app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', uploadRouter);
app.use('/api', productRouter);
app.use('/api', shopRouter);
app.use('/api', orderRouter);


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})



// app.get('/', (req, res) => {
//     res.json({ "msg": 'yo how are ya' });
// })



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("server is online....");
})