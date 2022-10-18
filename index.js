const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
const expressLayouts = require("express-ejs-layouts");
dotenv.config();
const db = require("./config/mongoose");
// const connectDB = require("./config/mongoose");
const flash = require("connect-flash");
const customWare = require("./config/middleware");

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");

app.use(
   sassMiddleware({
      src: "./assets/scss",
      dest: "./assets/css",
      debug: "true",
      outputStyle: "expanded",
      prefix: "/css",
   })
);

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(
   session({
      name: "codeial",
      // TODO change the secret before deployment in production mode
      secret: "blahsomething",
      saveUninitialized: false,
      resave: false,
      cookie: {
         maxAge: 1000 * 60 * 100,
      },
      store: MongoStore.create(
         {
            mongoUrl: process.env.MONGO_URI,
            autoRemove: "disabled",
         },
         function (err) {
            console.log(err || "connect-mongodb setup ok");
         }
      ),
   })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customWare.setFlash);

// use express router
app.use("/", require("./routes"));

app.listen(process.env.PORT, (error) => {
   if (error) {
      console.log("error in the port");
   }
   console.log(
      `\nHEY! SERVER IS RUNNING on Link :  http://localhost:${process.env.PORT}\n`
   );
});
