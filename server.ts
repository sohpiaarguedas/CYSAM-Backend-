import 'dotenv/config';
import app from './src/app';
import env from './env';

import authRoutes from './src/routes/authRoutes';
import articlesRoutes from "./src/routes/articlesRoutes";
import aiRoutes from './src/routes/aiRoutes';


//use routes
app.use('/api/articles', articlesRoutes);


app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);



app.use('/api', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});