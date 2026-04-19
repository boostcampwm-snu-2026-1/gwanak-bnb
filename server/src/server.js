import dotenv from 'dotenv'
import app from './app.js'
import connectDatabase from './config/db.js'

dotenv.config()

const port = Number(process.env.PORT) || 4000

async function startServer() {
  try {
    await connectDatabase()

    app.listen(port, () => {
      console.log(`API server listening on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to start API server', error)
    process.exit(1)
  }
}

startServer()
