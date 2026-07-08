import bcrypt from 'bcrypt';
import env from "../../env";

//Este método hashea la contraseña del user antes de guardarla en la bd
export const hashPassword = async (password:string)=>{
    return bcrypt.hash(password,env.BCRYPT_ROUNDS);
};

//Este método compara la constraseña ingresada por el usuario con la que ya existe hasheada en la bd, comparando si son iguales o no.
export const comparePasswords = async (password:string,hashedPassword:string)=>{
    return bcrypt.compare(password,hashedPassword);
};