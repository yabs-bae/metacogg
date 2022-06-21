import app from './app'
import { connectToDatabase } from './db';

const PORT = 3001;

(async () => {
    await connectToDatabase();
    console.log('Connected to the database successfully!');

    app.listen(PORT, () => console.log("Server is running at PORT 3001 🚀"))
  
  })();