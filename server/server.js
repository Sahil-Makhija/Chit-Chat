const express = require('express');
const { userRoutes, convoRoutes, messageRoutes } = require('./routes')
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload')
const connectToDatabase = require('./database');
const { PORT, SERVER_URL, FRONTEND_URL } = process.env
const cloudinary = require('cloudinary');
const Message = require('./models/messageModel');

cloudinary.config({
  cloud_name: 'dlkti7osi',
  api_key: '548216667555433',
  api_secret: 'cxsRST_gEzei9RJkPjw_r4BoASY'
});

dotenv.config()
connectToDatabase()
const app = express()

const corsOptions = {
  origin: `${FRONTEND_URL}`,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use('/', userRoutes)
app.use('/', messageRoutes)
app.use('/', convoRoutes)


// ----------------for Deployment ----------------

// const path = require('path');
// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

const server = app.listen(PORT, () => {
  console.log(`** server initialised at : ${SERVER_URL}:${PORT}/ **`);
})

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: `${FRONTEND_URL}`
  },

})



app.use(fileUpload())







io.on('connection', (socket) => {

  socket.on('user-join', (room, userData) => {
    socket.join(room)
  })

  socket.on('user-left',(room)=>{
    socket.leave(room)
  })

  socket.on('message', (room, msg) => {
    io.to(room).emit('message', msg)
    const {sender,content,type} = msg
    Message.create({sender,content,conversation_id:room,type,timestamp:new Date().toLocaleString()})
  })

})



app.get('/', (req, res) => {
  res.status(200).end('hello world')
})
app.post('/file/upload', async (req, res) => {
  try {
    const file = req.files?.file
    // const cloud = await cloudinary.v2.uploader.upload(`data:${file.mimetype};charset=${file.encoding};base64,${file.data}`)
    // const { public_id } = cloud
    res.json({
      public_id : 'wait for it'
    })
  }
  catch (e) {
    console.log(e);
    res.json({
      staus: false,
      error: 'file not found'
    })
  }
})


