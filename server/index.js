import connectDatabase from "./config/database.js";
import env from "./config/env.js";
import app from "./app.js";

async function startServer() {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`gwanak-bnb server listening on ${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("서버 시작에 실패했습니다.");
  console.error(error);
  process.exit(1);
});
