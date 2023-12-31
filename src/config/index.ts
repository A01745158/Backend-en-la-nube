//YA QUEDÓ

// Aquí vamos a poner las variables de configuración de la app
// el + es para que lo tome como número (lo de la derecha)
// si no dan un puerto por default será el 8080
export const PORT:number = process.env.PORT ? +process.env.PORT:8080;
export const NODE_ENV:string = process.env.NODE_ENV ? process.env.NODE_ENV:'development';
export const DB_HOST :string = process.env.DB_HOST ? process.env.DB_HOST:'localhost'; 
export const AWS_REGION:string = process.env.AWS_REGION ? process.env.AWS_REGION:''; 
export const AWS_ACCESS_KEY:string = process.env.AWS_ACCESS_KEY ? process.env.AWS_ACCESS_KEY:'';
export const AWS_SECRET_ACCESS_KEY:string = process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY:'';
export const AWS_SESSION_TOKEN:string = process.env.AWS_SESSION_TOKEN? process.env.AWS_SESSION_TOKEN:'';
export const PREFIX_TABLE = NODE_ENV === "production" ? '':'-DEV';
export const COGNITO_APP_CLIENT_ID = process.env.COGNITO_APP_CLIENT_ID?process.env.COGNITO_APP_CLIENT_ID:'';
export const COGNITO_APP_SECRET_HASH = process.env.COGNITO_APP_SECRET_HASH?process.env.COGNITO_APP_SECRET_HASH:'';
export const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID?process.env.COGNITO_USER_POOL_ID:'';