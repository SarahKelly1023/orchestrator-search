import express from "express";
import bodyParser from "body-parser";
import { startIndex, getTaskStatus, cancelTask, reindexTask } from "./controllers/index.controller";
import { search } from "./controllers/search.controller";

const app = express();
app.use(bodyParser.json());

app.post("/index/start", startIndex);
app.get("/index/:taskId", getTaskStatus);
app.post("/index/reindex", reindexTask);
app.post("/index/:taskId/cancel", cancelTask);

app.get("/search", search);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));