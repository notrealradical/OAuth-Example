// Dependencies
import env from "./env";
import CryptoJS from "crypto-js";

// Encrypt Function
export const encrypt = (text: string) => {
    return CryptoJS.AES.encrypt(text, env.JWT_SECRET as string).toString();
};

export const decrypt = (text: string) => {
    const bytes = CryptoJS.AES.decrypt(text, env.JWT_SECRET as string);
    return bytes.toString(CryptoJS.enc.Utf8);
};
