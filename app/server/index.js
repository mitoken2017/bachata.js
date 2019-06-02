const express = require('express')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport') 
const mongoose = require('mongoose') 
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

app.use(cors())
// Set up DB
const dbconfig = {
  useCreateIndex: true,
  useNewUrlParser: true
}
const db =  'mongodb://mongo:27017/rh'

// mongoose.connect(db, dbconfig, function(error){
//   console.log(error)
// })
mongoose.connect(db, dbconfig).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
mongoose.Promise = global.Promise
//Session
app.use(bodyParser.json());
app.use(cookieParser());
const sess = session({
  secret: '9dj48bhkldhr48fj3890drkgb6739&#HF(&5j5&*^%',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000000 }
})
if (!config.dev) {
  //sess.cookie.secure = true
}
app.use(sess)

app.use(passport.initialize())
app.use(passport.session())



require('./auth_config')(passport)

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
