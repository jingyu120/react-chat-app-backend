const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { Server } = require("socket.io");
const http = require("http");
const authRoutes = require("./routes/AuthRoutes");
const userRoutes = require("./routes/UserRoutes");
const messageRoutes = require("./routes/MessageRoutes");
const conversationRoutes = require("./routes/ConversationRoutes");

mongoose.connect(
  "mongodb+srv://jingyu120:Password123@cluster0.t2epm.mongodb.net/react-chat-app?retryWrites=true&w=majority"
);
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("common"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "https://gracious-raman-429b5e.netlify.app",
            "http://localhost:3000",
        ],
        methods: ["GET", "POST"],
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("addUser", async (userId) => {
        await addUser(userId, socket.id);
        console.log(users);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderID, receiverID, text }) => {
        const user = getUser(receiverID);
        user &&
        io.to(user.socketId).emit("getMessage", {
            senderID,
            text,
        });
    });

    socket.on("disconnect", async () => {
        console.log("a user disconnected");
        await removeUser(socket.id);
        console.log(users);
        io.emit("getUsers", users);
    });
});


server.listen(3001, () =>
  console.log("Server is listening at port", server.address().port)
);