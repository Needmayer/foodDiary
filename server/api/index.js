import express from 'express'
import User from './routes/user';

const router = express.Router()
const user = User(router)

export default router;
