require("dotenv").config();

const Express = require("express");
const dbConnection = require("./db");
const controllers = require("./controllers");
const middleware = require("./middleware");

const app = Express();

app.use(middleware.CORS);
app.use(Express.json());

app.use("/user", controllers.usercontroller);
app.use("/rev", controllers.revcontroller);
app.use("/inq", controllers.inqcontroller);
app.use(middleware.validateSession);

try {
    dbConnection.authenticate()
    .then(async () => await dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log (`[SERVER]: Yay! App is listening on ${process.env.PORT}`)
        })
    })
} catch (err) {
    console.log('[SERVER]: Oh no! Server crashed!');
    console.log(err)
}