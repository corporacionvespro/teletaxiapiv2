import { Request, Response } from "express";
const pool = require("../../../mysql/database");
const fetch = require("node-fetch");

export const pushNotifyPassenger = async (req: Request, res: Response) => {
    const {token,titulo,descripcion} = req.body;
    var notificationContext = {
      "title":titulo,
      "body":descripcion,
      "activity":"MenuActivity"
    }
    var notificationReady = {
        "to":token,
        "data":notificationContext
    }

    fetch('https://fcm.googleapis.com/fcm/send',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'key=AAAA-oLwWwU:APA91bFoHp1lDQUaPJ9oPMsu5D0bjb5KIOcxNnD9hFCGYJxDTNeQa1-0Z15wAiZ1X6eFhVJxGwiiUWEgY2YsqAj2WAXmfw7jNv8b4luwqfRR_9K8sDzVDPzl9w9ns9vbL_K0SCItHJOt',
        },
        body:JSON.stringify(notificationReady)
    }).then((response:any)=>{
        if(response.status === 200){
         res.status(200).json({
            "msg":'Notificacion enviada al pasajero.'
         });
      }
    }).catch((error:any)=>{
        res.status(500).json({
            "msg":'Algo salió mal, hable con el administrador.'
        });
    })
   
 };