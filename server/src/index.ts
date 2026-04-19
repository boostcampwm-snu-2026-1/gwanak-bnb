import { PORT } from './config/env.js'
import { createApp } from './app.js'
import { connectDb } from './db/connect.js'

async function main(): Promise<void> {
  await connectDb()
  const app = createApp()
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
