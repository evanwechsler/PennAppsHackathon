import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import addPerson from '../controllers/PassportController.mjs';


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

const router = express.Router();
router.post('/addperson', addPerson);
router.get('/getperson', getPerson);

app.use('/api', router.routes);


app.listen(8080, () => console.log('Server is starting on url http://localhost:' + '8080'));

export default app;