import express from "express";

import { env } from "./util/config";
import router from "./routes/routes";
import { Socket } from "socket.io";
import { allUsersConnected } from "./util/util";
import { sendMessage } from "./app/conversation/sendMessage";
import { seenConversation } from "./app/conversation/seenConversation";
import { executeConversationsFromUser } from "./app/conversation/getConversations";

const path = require("path");

const init = () => {
  const app = express();

  let finalPath = path.basename(__dirname);
  finalPath = path.join("/usr/src/app/", "uploads");

  app.get("/file", (req: any, res: any) => {
    console.log("DIR : ", __dirname);

    console.log("DIR  2: ", finalPath);

    res.sendFile(__dirname + "/index.html");
  });

  app.get("/", (req: any, res: any) => {
    console.log("MyPug server");
    res.status(200).send("MyPug Server working..");
  });

  app.use(express.json());

  app.use(router);
  app.use("/pugs", express.static(path.join("", "uploads")));

  const httpServer = require("http").createServer(app);
  const io = require("socket.io")(httpServer, {});

  httpServer.listen(env.PORT, () => {
    console.log(`Listening on port ${env.PORT}`);
  });

  io.on("connection", (socket: Socket) => {
    console.log("Connection ! :", socket.id);
    socket.on("disconnect", (msg: any) => {
      console.log("Deconnecté !");
    });

    socket.on("disconnect_user", (msg: any) => {
      allUsersConnected.delete(msg);
      console.log("Deconnecté !");
    });

    socket.on("credentials", (msg: any) => {
      allUsersConnected.set(msg, socket.id);
    });

    socket.on("notification", async (msg: any) => {
      const result = await executeConversationsFromUser(msg.userId);
      socket.emit("notificationCallBack", result);
    });

    socket.on("seenConversation", async (msg: any) => {
      const result = await seenConversation(
        msg.senderUsername,
        msg.conversationId
      );
      if (result.code == 0) {
        console.log("Message vu");
        socket.emit("seenCallback", result.code.toString());
      } else {
        socket.emit("seenCallback", result.code.toString());
      }
    });

    socket.on("message", async (msg: any) => {
      const result = await sendMessage(
        msg.senderUsername,
        msg.receiverUsername,
        msg.content,
        msg.type
      );
      console.log(result);

      if (result.code == 0) {
        if (allUsersConnected.has(msg.receiverUsername)) {
          io.to(allUsersConnected.get(msg.receiverUsername)).emit(
            "instantmessage",
            result.message
          );
        }

        socket.emit(
          "messagesuccess",
          `${result.code.toString()}_${msg.receiverUsername}`
        );
      } else {
        socket.emit("messagesuccess", result.code.toString());
      }
    });
  });
};

export { init };
