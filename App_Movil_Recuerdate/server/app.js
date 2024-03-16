import express from "express";
import {
    getRecordatoriosByID,
    getRecordatorios,
    shareRecordatorio,
    getSharedRecordatoriosByID,
    getUserByID,
    getEmailByID,
    createRecordatorio,
    deleteRecordatorio,
    toggleCompleted,
} from "./database.js"
import cors from 'cors'

const corsOptions = {
    origin: ["http://localhost:8081", "exp://192.168.80.13:8081"], 
    methods: ["POST", "GET"],
    credentials: true, //mandar cookies y autentificacion por la API
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/recordatorios/:id", async(req, res) =>{
    const recordatorios = await getRecordatoriosByID(req.params.id);
    res.status(200).send(recordatorios);
})

app.get("/recordatorios/shared_recordatorios/:id", async (req, res) => {
    const recordatorio = await getSharedRecordatoriosByID(req.params.id);
    const author = await getUserByID(recordatorio.user_id);
    const shared_with = await getUserByID(recordatorio.shared_with_id);
    res.status(200).send({ author, shared_with });
})

app.get("/users/:id", async (req, res) => {
    const user = await getUserByID(req.params.id);
    res.status(200).send(user);
})

app.put("/recordatorios/:id", async (req, res) => {
    const { value } = req.body;
    const recordatorio = await toggleCompleted(req.params.id, value);
    res.status(200).send(recordatorio);
})

app.delete("/recordatorio/:id", async (req, res) => {
    await deleteRecordatorio(req.params.id);
    res.send({ message: "Recordatorio borrado completamente"});
})

app.post("/recordatorios/shared_recordatorios", async (req, res) => {
    const { recordatorios_id, user_id, email  } = req.body;
    
    const userToShare = await getEmailByID(email);
    const sharedRecordatorio = await shareRecordatorio(recordatorios_id, user_id, userToShare.id);
    res.status(201).send(sharedRecordatorio);
})

app.post("/recordatorios", async (req, res) => {
    const { user_id, titulo, descripcion, fecha_hora } = req.body;
    const recordatorio = await createRecordatorio( user_id, titulo, descripcion, fecha_hora);
    res.status(201).send(recordatorio);
})




app.listen(8080, () => {
    console.log("Server running on port 8080");
});