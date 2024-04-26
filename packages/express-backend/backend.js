import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js"

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userServices
        .getUsers(name, job)
        .then((result) => {
            res.send({ users_list: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("An error occurred in the server.");
    });
});
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    userServices.findUserById(id).then((result) => {
        if (result === undefined || result === null) {
            res.status(404).send("Resource not found.");
        } else res.send({ users_list: result });
    });
});
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userServices.addUser(userToAdd).then((saved_user) => {
        if (saved_user) res.status(201).send(saved_user);
        else res.status(500).end();
    });
});
app.delete("/users/:id", (req, res) => {
    const userIdToDelete = req.params.id;
    userServices.deleteUser(userIdToDelete).then((deleted_user) => {
        if (deleted_user) res.status(204).send(deleted_user);
        else res.status(404).send("Resource not found.");
    });
});


app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});