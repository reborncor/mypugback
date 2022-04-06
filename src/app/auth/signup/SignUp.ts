import {Request, Response} from "express";
import BaseResponse from "../../../response/BaseResponse";
import {checkThatUserSignUpCredentialsOrThrow} from "../../../util/validator/checkdata";
import {User} from "../../../models/User";
import {encodePassword} from "../../../util/security/passwordManagement";
import UserRepository from "../../../repository/UserRepository";
import {CustomError} from "../../../util/error/CustomError";




export const signUp = async  (req : Request, res : Response) =>{
    const { email, username, phoneNumber, password} = req.body
    // console.log("DATA :", req.body)
    try{
        const  user = await signUpUser(email,username,password, phoneNumber);
        res.status(201).json({code : user.code, message : user.message, payload : user.payload});
    }catch (err : any){

        if(err instanceof CustomError){
            console.log(err);
            res.status(400).json({message : err.message, code : err.code});
        }
        else{
            console.log(err);
        }

    }

}

const signUpUser = async (email :string, username :string , password :string, phoneNumber :string,): Promise<BaseResponse<null>> => {


    checkThatUserSignUpCredentialsOrThrow(email,password, phoneNumber, username);

    // const existingUser = await UserRepository.findByEmail(email);
    // const existingUserWithUserName = await UserRepository.findByUsername(username);
    // const existingUserWithPhoneNumber = await UserRepository.findByPhoneNumber(phoneNumber);

    // console.log("User : ",existingUser);
    // checkThatUserDoesntExistOrThrow(existingUser);
    // checkThatUserWithUsernameDoesntExistOrThrow(existingUserWithUserName);
    // checkThatUserWithPhoneNumberDoesntExistOrThrow(existingUserWithPhoneNumber);


    const hashedPassword = await encodePassword(password)
    const newUser : User = {
        admin: false, email, password: hashedPassword, phoneNumber, username,followersUser : [],followers : 0, following : 0,
    }

    await UserRepository.insert(newUser);

    return  {
        code: 0, message: "Inscription réalisée avec succès",
    }

}

