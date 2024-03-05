import express from "express";
import {
    getRecordatoriosByID,
    getRecordatorios,
    shareRecordatorio,
    getSharedRecordatoriosByID,
    getUserByID,
    createRecordatorio,
    deleteRecordatorio,
    toggleCompleted,
} from "./database.js"


const app = express();
app.use(express.json());

app.get("/recordatorios/:id", async(req, res) =>{
    const recordatorios = await getRecordatoriosByID(req.params.id);
    res.status(200).send(recordatorios);
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
});