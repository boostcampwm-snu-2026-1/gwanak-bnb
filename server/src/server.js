import 'dotenv/config'
import app from './app.js'
import { connectToMongoDB } from './config/db.js'

const port = Number(process.env.PORT) || 4000

async function startServer() {
  try {
    await connectToMongoDB()

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  } catch (error) {
    console.error('Server startup failed:', error)
    process.exit(1)
  }
}

startServer()
