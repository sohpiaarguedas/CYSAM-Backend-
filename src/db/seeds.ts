import db from './conection';
import { articles } from './schema';

const seed = async () => {
    // PROTECTION: Prevent seeding in production
    const appStage = process.env.APP_STAGE;

    if (appStage === 'production') {
        console.error('ERROR: Cannot run seed script in production environment!');
        console.error('Current APP_STAGE:', appStage);
        process.exit(1); // Exit with error code
    }

    // confirmation for staging/test environments
    console.log(`Running seed in ${appStage} environment...`);
    console.log('starting seed...');

    try {
        console.log('deleting existing data...');
        await db.delete(articles).execute();
        console.log('inserting seed data...');

        const insertedArticles = await db.insert(articles).values([

            {
                title: "Phishing: El arte de engañar en la red",
                summary: "Conoce cómo los ciberdelincuentes suplantan identidades para robar datos bancarios y cómo detectarlos.",
                media_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                media_type: "youtube",
                link_preview: "video.mp4",
                link_Image_Preview: "https://i.pinimg.com/736x/7c/ea/39/7cea3910623cf39ae839ae86fe702625.jpg",
                button_text: "APRENDER"
            },
            {
                title: "Contraseñas Seguras y Robustas",
                summary: "Aprende a crear llaves digitales que protejan tus cuentas de los ataques de fuerza bruta más comunes.",
                media_url: "https://i.pinimg.com/736x/7c/ea/39/7cea3910623cf39ae839ae86fe702625.jpg",
                media_type: "image",
                link_preview: "video.mp4",
                link_Image_Preview: "https://i.pinimg.com/736x/7c/ea/39/7cea3910623cf39ae839ae86fe702625.jpg",
                button_text: "LEER MÁS"
            },
            {
                title: "Ingeniería Social en Redes Sociales",
                summary: "Los peligros detrás de los cuestionarios inocentes y perfiles falsos que buscan recopilar tu información personal.",
                media_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                media_type: "youtube",
                link_preview: "video.mp4",
                link_Image_Preview: "https://i.pinimg.com/736x/7c/ea/39/7cea3910623cf39ae839ae86fe702625.jpg",
                button_text: "VER DETALLES"
            },
            {
                title: "Autenticación de Dos Factores (2FA)",
                summary: "Tu segunda línea de defensa. Por qué es vital activarlo en todas tus plataformas y aplicaciones digitales.",
                media_url: "https://i.pinimg.com/736x/87/df/cc/87dfcc88ab49f8d4aa45b76adc8c271e.jpg",
                media_type: "image",
                link_preview: "video.mp4",
                link_Image_Preview: "https://i.pinimg.com/736x/87/df/cc/87dfcc88ab49f8d4aa45b76adc8c271e.jpg",
                button_text: "PROTEGER"
            },
            {
                title: "Estafas comunes en compras online",
                summary: "Aprende a identificar tiendas falsas, ofertas sospechosas y métodos de pago inseguros en la web.",
                media_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                media_type: "youtube",
                link_preview: "video.mp4",
                link_Image_Preview: "https://i.pinimg.com/736x/7c/ea/39/7cea3910623cf39ae839ae86fe702625.jpg",
                button_text: "EVITAR ESTAFAS"
            }


        ]).returning();

        console.log('Seed completed successfully!');

    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1); // Exit with error code
    }
}

seed();