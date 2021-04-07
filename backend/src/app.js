import express from "express";
import path from "path";
import logger from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import createError from "http-errors";
import { FRONTEND_URL, MONGO_DB_CONNECTION_STRING } from "./config";

// routes
import indexRouter from "./routes/index";
import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";
import usersRouter from "./routes/users";
import gistsRouter from "./routes/gists";
import todosRouter from "./routes/todos";
import projectsRouter from "./routes/projects";

const app = express();

// cors options
const corsOpt = {
  origin: FRONTEND_URL,
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders:
    "Access-Control-Allow-Headers, Origin,OPTIONS,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  credentials: true,
};

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../../public")));
app.use(cors(corsOpt));

app.use(
  session({
    secret: "1234567890",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
      httpOnly: true,
      maxAge: 3600000,
    },
  })
);

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/users", usersRouter);
app.use("/gists", gistsRouter);
app.use("/todos", todosRouter);
app.use("/projects", projectsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
