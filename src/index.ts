import Server from "./providers/Server";
import express from 'express';
import cors from 'cors';
import FundraiserController from "./controllers/FundraiserController";

const servidor = new Server({
    port: 8080,
    middlewares: [
        express.json(),
        express.urlencoded({ extended: true }),
        cors()
    ],
    controllers: [
        FundraiserController.getInstance()
    ],
    env: 'development'
});

declare global {
    namespace Express {
        interface Request {
            user: string;
            token: string;
        }
    }
}

servidor.init();