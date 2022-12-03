import cors from 'cors';
import 'dotenv/config';
import express from "express";
import path from 'path';
import routes from './routes';

const PORT = process.env.PORT || 3001;

const app = express();

// Use CORS
app.use(cors({
	origin: '*',
}));

// Parse request body to JSON
app.use(express.json());

routes(app);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/dist')));
// Images folder
app.use('/static', express.static(path.resolve(__dirname, '../public')));

// All other GET requests not handled before will return our React app
app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
