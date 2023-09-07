import express,{Application} from 'express';
import cors from 'cors';
import passenger from '../routes/passenger';
import admin from '../routes/admin';
import request from '../routes/request';
import driver from '../routes/driver';
import token from '../routes/token';
import history from '../routes/history';
import ads from '../routes/ads';

import path from "path";
const locationDriver = require('../socket/location_driver');

class Server {
    private app: Application;
    private server:  any;
    private io: any;
    private port: string;
    private apiPaths = {
        auth: "/api/auth",
        passenger: "/api/passenger",
        driver: '/api/driver',
        admin: "/api/admin",
        request: '/api/request',
        token: '/api/token',
        history: '/api/history',
        ads: '/api/ads'


    };
    middleware() {
        this.app.use(cors({origin: '*'}));
        this.app.use(express.json())
        this.app.use(express.static(path.join(__dirname, "../public")));
        this.app.use(express.static("public"));
    }

    socket() {
        locationDriver(this.io);
    }
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '7070';
        this.server = require('http').createServer(this.app);

        this.io = require('socket.io')(this.server, {
            cors : {
                origin: '*',
            }
          });
        this.middleware();
        this.routes();
        this.socket();

    }

    routes() {
        this.app.use(this.apiPaths.passenger, passenger);
        this.app.use(this.apiPaths.driver, driver);
        this.app.use(this.apiPaths.admin, admin);
        this.app.use(this.apiPaths.request, request);
        this.app.use(this.apiPaths.token, token);
        this.app.use(this.apiPaths.history, history);
        this.app.use(this.apiPaths.ads, ads);
    
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('✓ The server Teletaxi is runing in port: '+this.port);
        })
    
    }
}
export default Server;