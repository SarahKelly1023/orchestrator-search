import { Request, Response } from "express";
import { IndexService } from "../services/index.service";
import { v4 as uuid } from "uuid";

const indexService = new IndexService();

export async function startIndex(req: Request, res: Response) {
  const correlationId = uuid();
  const { sourceId, sourcePath } = req.body;
  const task = await indexService.startIndexing(sourceId, sourcePath, correlationId);
  res.json(task);
}

export function getTaskStatus(req: Request, res: Response) {
  const { taskId } = req.params;
  const task = indexService.getTaskStatus(taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
}

export async function cancelTask(req: Request, res: Response) {
  const correlationId = uuid();
  const { taskId } = req.params;
  try {
    const task = await indexService.cancelTask(taskId, correlationId);
    res.json(task);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
}

export async function reindexTask(req: Request, res: Response) {
  const correlationId = uuid();
  const { sourceId, sourcePath } = req.body;
  try {
    const task = await indexService.reindexSource(sourceId, sourcePath, correlationId);
    res.json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}