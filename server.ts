import app from './src/app';
import env from './env';
//import created routes
import authRoutes from './src/routes/authRoutes';
import articlesRoutes from "./src/routes/articlesRoutes";

//use routes
app.use('/api/articles', articlesRoutes);
app.use('/api/authRoutes', authRoutes);


app.use('/api', (req, res) =>{
    res.status(404).json({ message: 'Endpoint not found' });
});


app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});


