import { Request, Response } from "express";
const path = require("path");
const fs = require("fs");

export const postPhoto = async (req: Request, res: Response) => {
  try {
    const {foto} = req.body;
      if( foto === undefined || foto === "undefined"){
        res.status(400).json({
          message:
            "Al parecer no se subio una imagen."
        });
       }
       else{
        res.status(200).json({
            mgs: 'Image subida correctamente'
        })
     
       
       }
    
    
  } catch (error) {
   
  }
};

