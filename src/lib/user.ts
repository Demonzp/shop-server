import { User } from "@prisma/client";
import { prisma } from "../../prisma/prisma-client";

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

export const delOldUserSesions = async (user:User, ip: string, agent: string)=>{
    try {
        //throw Error('delOldUserSesions Error!');
        await prisma.session.deleteMany({
            where:{
                OR:[
                    {
                        userId: user.id,
                        expiration:{
                            lte: Date.now()
                        }
                    },
                    {
                        userId: user.id,
                        ip,
                        agent
                    }
                ]
            }
        });
    } catch (error) {
        throw error;
    }
};