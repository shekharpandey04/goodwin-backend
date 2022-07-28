const bcrypt = require('bcrypt');
// const check = require('../validation/CheckValidation') 
const conn = require('../config/db')
const moment = require('moment'); 
 //const {authToken} =require('../middleware/getToken')
 //User login 
var nodemailer = require('nodemailer');
const e = require('express');


const authLogin = async (req, res) => {
    let message = null
    let statusCode = 400
    let error = {}
    console.log(req.body)

    let data = {} 

    try { 
        
         //    Check requeted user is exist or not
            const {email,password} = req.body
            let sql = `SELECT * FROM users WHERE LOWER(users.email)= ? `;
            let user = await conn.query(sql, [email.toLowerCase()]);
            if (user.length > 0) { 
                const usersRows = (JSON.parse(JSON.stringify(user))[0]);
                const comparison = await bcrypt.compare(password, usersRows.password)
                if (comparison) { 
                    const last_login = moment().format("YYYY-MM-DD HH:mm:ss"); 
                    statusCode = 200
                    message = 'Login success'
                    data = {
                        login:true,
                        profile:{
                            firstname:usersRows.first_name,
                            lastname:usersRows.last_name,
                            email:usersRows.email,


                        },
                        username:usersRows.username,  
                    }

                } else {
                    statusCode = 401
                    message = 'Password does not match!'
                }
            }    
            else {
                statusCode = 401
                message = 'Password or email does not match!'
            }      
            const responseData = {
                status: statusCode,
                message,
                user: data,
                errors: error,
                token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiU3VwZXIgQWRtaW4iLCJyb2xlX2lkIjoxLCJhZG1pbl9pZCI6MSwiaWF0IjoxNjUzMTMwNDMwLCJleHAiOjE2NTMxMzQwMzB9.hU41Zvx5uoaI7Nt46LaL8GFjTjAXUnet6GKhc5Ku4TA",
            }
            res.send(responseData)
        
    } catch (error) {
        res.send({ authLogin: error })
    }
}




const authSignUp = async (req, res) => {
    let message = null
    let register = false

    let statusCode = 400  
    try {
    
        const {username,email,password,phone,refer_id} = req.body

        const encryptedPassword = await bcrypt.hash(password, 10) 
            const formData = { 
                username:username,
                email   : email,
                password: encryptedPassword,
                phone:phone,
                refer_id:refer_id,
            };
            
                // Check requeted user is exist or not
                let sql = `SELECT * FROM users WHERE LOWER(email)= ? limit ?`;
                let user = await conn.query(sql, [formData.email.toLowerCase(), 1]);
                if (user.length > 0) {
                    statusCode  = 401
                    message     = 'Sorry! Email already exist try another email' 
                } else { 
                   const sql1  = `INSERT INTO users set ?`;
                   const users = await conn.query(sql1, formData)
                    if(users){
                        statusCode = 201
                        message = "User created success"
                        register=true
                    }else{
                        statusCode = 500
                        message = "Something went wrong! database error"
                    } 
                }
            
            const responseData = {
                status: statusCode,
                message, 
                register,

            }
            res.send(responseData)
        
    } catch (error) {
        res.send({ error: error })
    }
}


 const resetPassword = async (req, res) => {
    let message = null
    let statusCode = 400  
    try {
    
            const {email,new_password,old_password} = req.body
            
                const encryptedPassword = await bcrypt.hash(old_password, 10)  
                // Check requeted user is exist or not
                let sql = `SELECT * FROM users WHERE LOWER(email)= ?  limit ?`;
                let user = await conn.query(sql, [email.toLowerCase(), 1]);
                if (user.length > 0) {
                    const usersRows = (JSON.parse(JSON.stringify(user))[0]);
                    const comparison = await bcrypt.compare(old_password, usersRows.password)
                    if (comparison) {     
                const encryptedPassword2 = await bcrypt.hash(new_password, 10)  

                    let sql2 = "UPDATE users Set password=? WHERE email= ?"
                    const user  =await conn.query(sql2, [encryptedPassword2,email])
                    if(user){
                        statusCode  = 200
                        message     = 'Password reset successfully' 
                    }else{
                        statusCode  = 500
                        message     = 'Something Went wrong' 
                    }
                } else {
                    statusCode = 401
                    message = 'Password does not match!'
                }

                } else { 
                    statusCode  = 404
                    message     = 'Sorry Invalid email or password' 
                }
                

           
            const responseData = {
                status: statusCode,
                message
            }
            res.send(responseData)
        
    } catch (error) {
        res.send({ error: error })
    }
} 












module.exports = {
    authLogin ,
    authSignUp,
    //forgotPassword,
    resetPassword
}
