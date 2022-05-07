// import Fastify from "fastify"
import { Server } from "socket.io"
import http from "http"
import { tournamentEvents } from "./events/tournament.server.events"
import { getTournament } from "./store/tournament"
import roomEvents from "./events/room"
import { initialize, store } from "./store/store.server"
import "dotenv/config"

const PORT = process.env.PORT || 1337

console.info("Loading rooms...")
initialize()

const httpServer = http.createServer()
const io = new Server(httpServer, {
  cors: { origin: "*" },
  cookie: true,
})

io.on("connection", async (socket) => {
  console.log(`New Connection: ${socket.id}`)

  // Emits on connect.
  socket.emit("tournament", getTournament())
  socket.onAny((eventName: string, ...args: any[]) => {
    console.log(`[${socket.id}]: emitted ${eventName} with ${args}`)
  })

  // Events to listen
  socket.on("ping", (data: number) => {
    io.emit("ping", data)
  })
  tournamentEvents(io, socket)
  roomEvents(io, socket)
})

httpServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
