import  * as path  from 'path';


export interface IConfig {
    RAPID_API_URL : string;
    ENVIRONMENT: string;
    RAPID_API_HOST: string,
    RAPID_API_KEY: string
}

export let config : IConfig = {
    ENVIRONMENT: process.env.ENVIRONMENT ? process.env.ENVIRONMENT: 'developement',
    RAPID_API_URL : process.env.RAPID_API_URL,
    RAPID_API_HOST: process.env.RAPID_API_HOST,
    RAPID_API_KEY: process.env.RAPID_API_KEY
}


