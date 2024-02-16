export interface Config {
    host: string
}

export const config: Config = {
    host: process.env.NODE_ENV === 'production' ? 'https://www.stocksentinel.com' : 'http://localhost:3001'
}