const WebSocket = require("ws");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Novo cliente conectado");

  ws.on("message", (message) => {
    try {
      let data = JSON.parse(message);
      if (data[0] === "M") {
        let name = data[1][0];
        console.log(`Spawn: ${name}`);
        ws.send(JSON.stringify(["welcome", `Olá ${name}, bem-vindo!`]));
      }
      if (data[0] === "5") {
        console.log("Bot usou item de cura");
      }
    } catch (e) {
      console.log("Mensagem recebida:", message.toString());
    }
  });

  ws.on("close", () => console.log("Cliente desconectado"));
});

app.get("/", (req, res) => {
  res.send("Servidor WS do Helsing ativo!");
});
