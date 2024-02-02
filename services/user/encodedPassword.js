import bcrypt from "bcrypt";

export const encodedPassword = (password) => {
    var salt = bcrypt.genSaltSync(12);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};
