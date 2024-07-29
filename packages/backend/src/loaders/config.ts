import { exit } from "process";

interface IConfig {
    database: {
        host: string,
        port: number,
        user: string,
        password: string,
        database: string,
        max: number,
    },
    server: {
        host:string,
        port: number,
    },
    auth: {	
        secret: string,
        maxAge: number,
    },
}

export default IConfig;

const config: IConfig = {
    database: {
        host: process.env.DB_HOST || exit(1),
        port: parseInt(process.env.DB_PORT || exit(1)),
        user: process.env.DB_USER || exit(1),
        password: process.env.DB_PASSWORD || exit(1),
        database: process.env.DB_NAME || exit(1),
        max: parseInt(process.env.DB_MAX || exit(1)),
    },
    server: {
        host: process.env.HOST || exit(1),
        port: parseInt(process.env.PORT || exit(1)),
    },
    auth: {
        secret: process.env.SECRET || exit(1),
        maxAge: parseInt(process.env.JWT_EXPIRATION || exit(1)),
    },
}

export {
    config,
    IConfig
};