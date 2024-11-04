// Dependencies
import env from "./env";
import CryptoJS from "crypto-js";

// Encrypt Function
export const encrypt = (text: string) => {
    return CryptoJS.AES.encrypt(text, env.ENCRYPTION_KEY as string).toString();
};

export const decrypt = (text: string) => {
    const bytes = CryptoJS.AES.decrypt(text, env.ENCRYPTION_KEY as string);
    return bytes.toString(CryptoJS.enc.Utf8);
};
