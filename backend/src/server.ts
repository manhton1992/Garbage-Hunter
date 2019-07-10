/**
 * Landing file for NodeJS
 */

/** Package imports */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from 'config';
import cors from 'cors';

/** Module imports */
import { globalRouter } from './controllers/router';
import { globalErrorHandler } from './middlewares/errorhandler.middleware';

/** Variables */
export const app: express.Application = express();
const DB_HOST: string = config.get('database.host');
const PORT: string = config.get('server.port');

app.use(cors());
app.use(bodyParser.json());

/** Setup Database */
mongoose.connect(DB_HOST, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

app.use('/api', globalRouter);
app.use(globalErrorHandler);

/** Start server */
app.listen(PORT, () => {
	console.log(`Server is now running on port ${PORT}`);
});
