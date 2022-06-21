import express from 'express'// import our local router file
import { userRoute } from './routes/user'// init express app
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: express.Application = express();
app.use(helmet());

/** Parse the body of the request */
app.use(cors({ origin: '*' }));
// in latest body-parser use like below.
app.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

// route
app.use('/', userRoute());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

export default app


