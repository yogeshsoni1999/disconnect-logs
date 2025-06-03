import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/** cross origin resource is for comunicate frontend with backend apis */ 
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));


app.use(express.json({limit:"20kb"})); // set limit for accept json data here body-parse also be used
app.use(express.urlencoded({
    extended:true,
    limit:"20kb"
})); // manage data securely in url

app.use(bodyParser.urlencoded({
	extended: true,
	limit	: '50mb',
    parameterLimit : 1000000
}));

app.use(bodyParser.json());
app.use(cookieParser()); //  used to store data in user's browser securely from our server
app.use(express.static("public"));  //manage static data like images , favicon etc in public folder
app.set('views', path.join(__dirname, 'views'));



// import routes
import systemRouter from './routes/system.routes.js'

//Routes declaration
app.use("/api/v1/systems" , systemRouter)

export  default app;