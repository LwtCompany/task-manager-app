import express, { Application } from 'express'
import cors, { CorsOptions } from 'cors'
import Routes from './routes'
import connectDB from './services/mongo-connection.service'
import dotenv from 'dotenv'
export default class Server {
  PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080
  HOST: string = process.env.HOST ? process.env.HOST : 'localhost'
  constructor(app: Application) {
    dotenv.config()
    this.config(app)
    connectDB()
    new Routes(app)
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: true
    }

    app.use(cors(corsOptions))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
  }
}

;(function () {
  const app: Application = express()
  const server: Server = new Server(app)
  app
    .listen(server.PORT, server.HOST, function () {
      console.log(
        `Server running at \x1b[33m http://${server.HOST}:${server.PORT}/\x1b[39m`
      )
    })
    .on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.log('Error: address already in use')
      } else {
        console.log(err)
      }
    })
})()
