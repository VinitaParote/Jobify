import bcrypt from 'bcryptjs';

export const hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const comparePassword = async (password, hashedPassword)=>{
    //console.log("pass", password, "user", hashedPassword);
     const isMatch = await bcrypt.compare(password, hashedPassword);
    //const isMatch = (password === hashedPassword) ? true : false
    console.log("pass match",isMatch);
    return isMatch;
}