import { Request, Response } from "express";
const pool = require("../../../mysql/database");
const fetch = require("node-fetch");

export const pushNotifyDriver = async (req: Request, res: Response) => {
    const {token,titulo,descripcion} = req.body;
    var notificationContext = {
      "title":titulo,
      "body":descripcion,
      "activity":"MainActivity"
    }
    var notificationReady = {
        "to":token,
        "data":notificationContext
    }

    fetch('https://fcm.googleapis.com/fcm/send',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'key=AAAA7uKyHu8:APA91bHL51tLdURVYXX2uXmVwixTEAvsly_f_WpRnElzcAyksOfM66q3qFmJxHLvznkX0UBBPhDFyxxAyjDPnWedy726VQQOFTegN3qF3k3gIPaIDvJFM7WxbTks0US9vihcfrjwAc1L',
        },
        body:JSON.stringify(notificationReady)
    }).then((response:any)=>{
        if(response.status === 200){
         res.status(200).json({
            "code":200,
            "msg":'Notificacion enviada al conductor.'
         });
      }
    }).catch((error:any)=>{
        res.status(500).json({
            "code":500,
            "msg":'Algo salió mal, hable con el administrador.'
        });
    })
   
 };

 export const pushCustomNotifyDriver = async (req: Request, res: Response) => {
    const {id_conductor,titulo,descripcion} = req.body;

    const query = await pool.query(`SELECT token FROM conductor WHERE id_conductor ='${id_conductor}'`);
    const token = query[0].token;

    var notificationContext = {
      "title":titulo,
      "body":descripcion,
      "activity":"ActivityPayment"
    }
    var notificationReady = {
        "to":token,
        "data":notificationContext
    }

    fetch('https://fcm.googleapis.com/fcm/send',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'key=AAAAhH3VQcc:APA91bH_0HL3Q-ReQ8lWCuugm5gXiFqmCfHKCdZMam3LHrVmAYJ3PapWUCJvzGg1bUu6uDEqxn40UkNC9An1iqYQX1tMKwBVv1gEgMN5WQ_3K8x525TjOTdYhzDlUowZRAOyMy_ipTUc',
        },
        body:JSON.stringify(notificationReady)
    }).then((response:any)=>{
        if(response.status === 200){
         res.status(200).json({
            "code":200,
            "msg":'Notificacion enviada al conductor.'
         });
      }
    }).catch((error:any)=>{
        res.status(500).json({
            "code":500,
            "msg":'Algo salió mal, hable con el administrador.'
        });
    })
   
 };