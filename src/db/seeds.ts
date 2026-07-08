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
                title: "¿QUÉ ES EL PHISHING Y CÓMO FUNCIONA?",
                summary: "Conoce cómo los ciberdelincuentes suplantan identidades para robar datos bancarios y cómo detectarlos.",
                media_url: "https://www.youtube.com/embed/UuuAlP7ay6U?si=k6CdZrKNDvEtCXHs",
                media_type: "youtube",
                link_preview: "video.mp4",
                link_Image_Preview: "https://cyberhoot.com/wp-content/uploads/2020/05/GettyImages-956400244-1-1024x645.jpg"
            },
            {
                title: "Contraseñas Seguras y Robustas",
                summary: "Aprende a crear llaves digitales que protejan tus cuentas de los ataques de fuerza bruta más comunes.",
                media_url: "https://www.youtube.com/embed/-BaQ7FHo6aM?si=LnjRpiddajDi2VbW",
                media_type: "image",
                link_preview: "video.mp4",
                link_Image_Preview: "https://www.incibe.es/sites/default/files/2024-02/imagen-blog-campana-contrasenas-seguras.jpg"
            },
            {
                title: "¡Cuidado con las TRANSFERENCIAS FANTASMA! ¿Cómo identificar y protegerte del fraude?",
                summary: "Una transferencia fantasma es un fraude que consiste en crear transacciones que aparentan ser legítimas, pero que en realidad se trata de transacciones engañosas. En este mundo digital, los estafadores utilizan métodos de ingeniería social (aplicaciones) para obtener información confidencial de sus víctimas, así como sus datos bancarios y números de tarjetas de crédito; esto sucede principalmente en ventas que ofrecen beneficios o promociones muy atractivas; ¡desconfía!",
                media_url: "https://www.youtube.com/embed/lBfD29W4MdI?si=DS2uPZjNbe3_wCCj",
                media_type: "youtube",
                link_preview: "video.mp4",
                link_Image_Preview: "https://open-images.acast.com/shows/61955367cb03c875f761711d/1724528136083-a619ed1e-1e71-41b5-a1b1-01a497ae7d19.jpeg?height=750"
            },
            {
                title: "Ciberseguridad para Adultos Mayores",
                summary: "Los adultos mayores son un grupo vulnerable a los ataques cibernéticos debido a la falta de familiaridad con la tecnología y la confianza en fuentes no verificadas. Este artículo ofrece consejos prácticos para proteger su información personal y financiera en línea.",
                media_url: "https://www.youtube.com/embed/ME50yCMECKw?si=d_ZWEvOjt78elHnF",
                media_type: "youtube",
                link_preview: "video.mp4",
                link_Image_Preview: "https://www.infordisa.com/wp-content/uploads/2022/12/ciberseguridad-para-mayores.jpg"
            },
            {
                title: "10 recomendaciones de seguridad financiera para Personas Adultas Mayores",
                summary: "Con el avance de la tecnología, las personas adultas mayores se encuentran a menudo vulnerables a estafas bancarias, telefónicas y de fraudes financieros. Acompáñanos en este capítulo, a explorar los 10 pasos indispensables para garantizar su seguridad financiera, al tiempo que daremos a conocer las estafas del mundo digital más comunes contra los adultos mayores en México; descubre las medidas de prevención y como denunciar este tipo de estafas.",
                media_url: "https://www.youtube.com/embed/D4VDXSnV3k8?si=11k8QMV39VLzDZaW",
                media_type: "youtube",
                link_preview: "video.mp4",
                link_Image_Preview: "https://oei.int/wp-content/uploads/2025/09/adultos-mayores-y-ciberseguridad.jpg"
            }


        ]).returning();

        console.log('Seed completed successfully!');

    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1); // Exit with error code
    }
}

seed();