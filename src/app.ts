import express from "express";

import { env } from "./util/config";
import router from "./routes/routes";
import { Socket } from "socket.io";
import { allUsersConnected } from "./util/util";
import { sendMessage } from "./app/conversation/sendMessage";
import { seenConversation } from "./app/conversation/seenConversation";
import { executeConversationsFromUser } from "./app/conversation/getConversations";
import { createCompetition } from "./app/competition/JobCreateCompetition";
import { voteForParticipant } from "./app/competition/VoteForParticipant";
import { jobSelectParticipants } from "./app/competition/JobSelectParticipants";
import { jobSetCompetitionsWinners } from "./app/competition/JobSetCompetitionWinners";

const schedule = require("node-schedule");

const init = () => {
  const app = express();

  app.get("/file", (req: any, res: any) => {
    res.sendFile(__dirname + "/index.html");
  });

  app.get("/", (req: any, res: any) => {
    console.log("MyPug server");
    res.status(200).send("MyPug Server working..");
  });

  app.use(express.json());

  app.use(router);

  const httpServer = require("http").createServer(app);
  const io = require("socket.io")(httpServer, {});

  httpServer.listen(env.PORT, () => {
    console.log(`Listening on port ${env.PORT}`);
  });

  // Tous les lundis à 12:01
  const jobCompetition = schedule.scheduleJob(
    "1 * 12 * * /1",
    async function () {
      await createCompetition();
    }
  );
  // Tous les lundis à 20:01
  const jobParticipants = schedule.scheduleJob(
    "1 * 20 * * /1",
    async function () {
      await jobSelectParticipants();
    }
  );

  // Tous les dimanche à 12:01
  const jobWinner = schedule.scheduleJob("0 * 12 * * /1", async function () {
    await jobSetCompetitionsWinners();
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
        socket.emit("seenCallback", result.code.toString());
      } else {
        socket.emit("seenCallback", result.code.toString());
      }
    });

    socket.on("vote", async (msg: any) => {
      const result = await voteForParticipant(
        msg.currentUsername,
        msg.competitionId,
        msg.pugId,
        msg.username
      );
      console.log("Vote effectué");
      io.sockets.emit("voteCallBack", result);
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
