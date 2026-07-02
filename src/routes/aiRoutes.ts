import { Router, Request, Response } from 'express';
import { GoogleGenAI} from "@google/genai";

const aiRoutes = Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

aiRoutes.post('', async (req: Request, res: Response) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'El campo message es requerido.' });
        }

        console.log(`[CYSAM-AI] Procesando consulta: "${message}"`);

        const responseAI = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
            config: {
                systemInstruction: "Eres el asistente experto en ciberseguridad de la plataforma CYSAM. Tu objetivo principal es ayudar a estudiantes y adultos mayores en Costa Rica a identificar estafas, correos de phishing, fraudes bancarios lógicos y vulnerabilidades comunes en redes sociales. Habla con un tono empático, sumamente claro, educativo y directo. Evita usar tecnicismos excesivos o confusos."
            }
        });

        const botResponse = responseAI.text || "No logré procesar tu solicitud en este momento. Por favor, intenta plantear tu duda de otra forma.";

        return res.status(200).json({ response: botResponse });

    } catch (error) {
        console.error("Error crítico en el controlador de Gemini AI:", error);
        return res.status(500).json({ error: 'Internal Server Error en el servicio de IA' });
    }
});

export default aiRoutes;