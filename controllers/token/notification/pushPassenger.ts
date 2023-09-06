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
            'Authorization':'key=AAAAqL0HQsw:APA91bFJDcVdrK2Uz8DiwcRh7wkB5jGlCBKwxoJeJ2pnn9BpPxc6iG58y2GloTDwvh_NAQoJtl2KS5-02QH9i4r72IuFNjTazloJzE5EGfu5eFXM2Jn5W5DIgD0Jbz5aLauEe1NW7Yqh',
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