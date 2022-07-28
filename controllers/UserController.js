const bcrypt = require('bcrypt');
//const check = require('../validation/CheckValidation') 
const conn = require('../config/db')
const moment = require('moment'); 
//const {authToken} =require('../middleware/getToken')
// User login 
var nodemailer = require('nodemailer');
 


























//list of getPlayerDAta
const getPlayerData = async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM  users`;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent not found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error' )
    }
}

const getPlayerHistoryData = async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT user.id,user.user_id,user.username,game_name.game_name FROM  user left join round_report on user.user_id=round_report.player_id left join game_name on round_report.game=game_name.id`;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent not found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error' )
    }
}
/* const WheelOfFortunegetPlayerHistoryData = async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM game_record_wheeloffortune ORDER BY created DESC  `;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent not found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error' )
    }
}

const PokergetPlayerHistoryData = async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM game_record_pokerking ORDER BY created DESC`;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent not found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error' )
    }
}
const TigerVsElephantgetPlayerHistoryData = async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM game_record_dragon ORDER BY created DESC `;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent not found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error' )
    }
} */
/* const LuckyBallgetPlayerHistoryData = async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM game_record_lucky ORDER BY created DESC`;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent not found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error' )
    }
} */








const TitaligetPlayerHistoryData = async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM game_record_titali ORDER BY created DESC`;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent not found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error' )
    }
}







const DragonVsTigergetPlayerHistoryData = async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM game_record_dragon ORDER BY created DESC`;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent not found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error' )
    }
}














const Transaction = async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM transactions ORDER BY created DESC`;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent not found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error' )
    }
}


//Playerpointhistory
const getPlayerPointHistory = async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT user.id,user.user_id,user.username,game_record_dragon.game_id,game_record_dragon.created_at FROM user left join game_record_dragon on user.user_id=game_record_dragon.user_id`;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agenot found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error' )
    }
}

/* //GamesHistory------------------
const getDoubleChanceHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    let data;
    try { 
           // let sql = `SELECT * FROM round_report WHERE game=1 and outer_win=NULL and inner_win=NULL `;
           let sql = `SELECT * FROM round_report WHERE game=1 `;

            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "NOT found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}
const getJeetoJokerHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM round_report WHERE game=2 `;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}
const get16CardsHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM round_report WHERE game=3`;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}
const getSpinGameHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM round_report WHERE game=4 `;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}

 */














module.exports = {
    /* createDistrubutor ,
    createStokez,
    createAgent,
    createPlayer,
    createUser,  
    getUsers,
    getAdminData,
    sendPoints,
    changePassword,
    resetPassword,
    getAgents,
    getAgentsData, */
    getPlayerData,
    getPlayerHistoryData,


    //getAllPlayerData,
    /* WheelOfFortunegetPlayerHistoryData,
     PokergetPlayerHistoryData,
    TigerVsElephantgetPlayerHistoryData, */
    /* LuckyBallgetPlayerHistoryData, */

    TitaligetPlayerHistoryData,
    DragonVsTigergetPlayerHistoryData,

    Transaction,

    /* getStokezPointHistory,
    getAgentPointHistory,
    getPlayerPointHistory,
    getDoubleChanceHistory,
    getJeetoJokerHistory,
    get16CardsHistory,
    getSpinGameHistory,
 */




    

}