// cargamos express e iniciamos una aplicación
const app = require('express')()
// creamos un servidor HTTP desde de nuestra aplicación de Express
const server = require('http').Server(app)
// creamos una aplicación de socket.io desde nuestro servidor HTTP
const io = require('socket.io')(server)
// cargamos Next.js
const next = require('next')

// verificamos si estamos corriendo en desarrollo o producción
const dev = process.env.NODE_ENV !== 'production'
// iniciamos nuestra aplicación de Next.js
const nextApp = next({ dev })
// obtenemos el manejador de Next.js
const nextHandler = nextApp.getRequestHandler()

// este array va a ser nuestra base de datos
// no es una base de datos de verdad, pero para el ejemplo nos sirve
const messages = []

// cuando un usuario se conecte al servidor de sockets
io.on('connection', socket => {
  // escuchamos el evento `message`
  socket.on('message', (data) => {
    // guardamos el mensaje en nuestra "DB"
    messages.push(data)
    // enviamos el mensaje a todos los usuarios menos a quién los envió
    socket.broadcast.emit('message', data)
  })
})

// iniciamos nuestra aplicación de Next.js
nextApp.prepare().then(() => {
  // definimos una URL para obtener los mensajes
  app.get('/messages', (req, res) => {
    // y respondemos con la lista de mensajes serializada como JSON
    res.json(messages)
  })

  // para cualquier otra ruta de la aplicación
  app.get('*', (req, res) => {
    // dejamos que el manejador de Next se encargue y responda con el HTML o un 404
    return nextHandler(req, res)
  })

  // iniciamos el servidor HTTP en el puerto 3000
  server.listen(3000, (err) => {
    // si ocurre un error matamos el proceso
    if (err) process.exit(0)
    // si todo está bien dejamos un log en consola
    console.log('> Ready on http://localhost:3000')
  })
})