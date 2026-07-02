import type { Request, Response } from "express";
import db from "../db/conection";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { generateToken } from "../utils/jwt";

import {hashPassword, comparePasswords} from "../utils/passwords";

export const register = async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body;

        const hashedPassword = await hashPassword(password);

        const [user] = await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
        }).returning({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
        });

        const token = await generateToken({
            id: user.id,
            name: user.name,
            email: user.email,
            role: "user",
        });

        return res.status(201).json({
            ok: true,
            message: "Usuario registrado correctamente",
            data: user,
            token,
        });

    } catch (error) {
        console.error("Error during registration:", error);

        return res.status(500).json({
            ok: false,
            message: "Error al registrar el usuario",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!user) {
            return res.status(401).json({
                ok: false,
                message: "Credenciales inválidas",
            });
        }

        const isPasswordValid = await comparePasswords(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                ok: false,
                message: "Credenciales inválidas",
            });
        }

        const token = await generateToken({
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        });

        return res.status(200).json({
            ok: true,
            message: "Inicio de sesión exitoso",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role:user.role,
            },
            token,
        });

    } catch (error) {
        console.error("Error during login:", error);

        return res.status(500).json({
            ok: false,
            message: "Error al iniciar sesión",
        });
    }
};
