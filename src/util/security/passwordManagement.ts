import bcrypt = require("bcrypt");


export const encodePassword = async (password: any): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const isSame = async (
    encryptedPassword: string,
    password: string
): Promise<boolean> => {

    return await bcrypt.compare(password, encryptedPassword);
};