import express from 'express';

import { addVaccination, addPerson, getPerson } from '../controllers/PassportController.mjs';

const router = express.Router();

router.post('/addperson', addPerson);
router.get('/getperson', getPerson);

export default { router };