import bcrypt from "bcrypt";

export const comparePassword = (inPw, pw) => {
    // Kiểm tra mật khẩu
    const candidatePassword = inPw;
    if (bcrypt.compareSync(candidatePassword, pw)) {
        return true;
    }
    return false;
};
