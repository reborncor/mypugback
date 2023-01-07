"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./util/config");
const routes_1 = __importDefault(require("./routes/routes"));
const util_1 = require("./util/util");
const sendMessage_1 = require("./app/conversation/sendMessage");
const seenConversation_1 = require("./app/conversation/seenConversation");
const path = require("path");
const multer = require("multer");
const init = () => {
  const app = (0, express_1.default)();
  let finalPath = path.basename(__dirname);
  finalPath = path.join("/usr/src/app/", "uploads");
  //Client Side
  app.get("/file", (req, res) => {
    console.log("DIR : ", __dirname);
    console.log("DIR  2: ", finalPath);
    res.sendFile(__dirname + "/index.html");
  });
  //
  app.get("/", (req, res) => {
    console.log("MyPug server");
    res.status(200).send("MyPug Server working..");
  });
  app.use(express_1.default.json());
  app.use(routes_1.default);
  // app.use('/pugs', express.static(path.join(__dirname.replace("src",""), 'uploads')))
  app.use("/pugs", express_1.default.static(path.join("", "uploads")));
  const httpServer = require("http").createServer(app);
  const io = require("socket.io")(httpServer, {});
  httpServer.listen(config_1.env.PORT, () => {
    console.log(`Listening on port ${config_1.env.PORT}`);
  });
  io.on("connection", (socket) => {
    console.log("Connection ! :", socket.id);
    socket.on("disconnect", (msg) => {
      console.log("Deconnecté !");
    });
    socket.on("disconnect_user", (msg) => {
      util_1.allUsersConnected.delete(msg);
      console.log("Deconnecté !");
    });
    socket.on("credentials", (msg) => {
      util_1.allUsersConnected.set(msg, socket.id);
    });
    socket.on("seenConversation", (msg) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, seenConversation_1.seenConversation)(
          msg.senderUsername,
          msg.conversationId
        );
        if (result.code == 0) {
          console.log("Message vu");
          socket.emit("seenCallback", result.code.toString());
        } else {
          // console.log("Miss : ", result.code)
          socket.emit("seenCallback", result.code.toString());
        }
      })
    );
    socket.on("message", (msg) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, sendMessage_1.sendMessage)(
          msg.senderUsername,
          msg.receiverUsername,
          msg.content
        );
        if (result.code == 0) {
          // console.log("Receiver :"+ msg.receiverUsername)
          if (util_1.allUsersConnected.has(msg.receiverUsername)) {
            io.to(util_1.allUsersConnected.get(msg.receiverUsername)).emit(
              "instantmessage",
              result.message
            );
          }
          // console.log("Fine : ", result.code)
          socket.emit("messagesuccess", result.code.toString());
        } else {
          // console.log("Miss : ", result.code)
          socket.emit("messagesuccess", result.code.toString());
        }
      })
    );
  });
};
exports.init = init;
