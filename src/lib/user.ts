import { User } from "@prisma/client";

export const getUserLogin = (user:User)=>{
    return {
        uid: user.uid,
        email: user.email,
        firstName: user.firstName,
        secondName: user.secondName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
        verified: user.verified
    }
};