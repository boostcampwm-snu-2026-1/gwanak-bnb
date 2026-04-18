import mongoose from 'mongoose'

function getDatabaseStatus() {
  const readyStateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  }

  return readyStateMap[mongoose.connection.readyState] ?? 'unknown'
}

export function getHealthStatus(_request, response) {
  response.status(200).json({
    ok: true,
    database: getDatabaseStatus(),
  })
}

export default {
  getHealthStatus,
}
