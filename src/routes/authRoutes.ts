import {Router} from 'express';
import db from '../db/conection';
import {users} from '../db/schema';
import {eq} from 'drizzle-orm';

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const {name,email,password} = req.body;

        const newUser = await db.insert(users).values({
            name,
            email,
            password,
        }).returning();

        res.status(201).json({
            ok: true,
            message: "Usuario registrado correctamente",
            data: newUser[0],
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al registrar el usuario",
            error,
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        const userFound = await db.select().from(users).where(eq(users.email,email));

        if(userFound.length === 0){
            return res.status(404).json({
                ok: false,
                message: "Usuario no encontrado",
            });
        }

        const user = userFound[0];

        if(user.password !== password){
            return res.status(401).json({
                ok: false,
                message: "Contraseña incorrecta",
            });
        }

        res.status(200).json({
            ok: true,
            message: "Inicio de sesión correcto",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },//De momento solo para verificar que inicia sesión correctamente!
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al iniciar sesión",
            error,
        });
    }
});

export default router;