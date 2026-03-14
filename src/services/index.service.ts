import { TaskRepository } from "../repository/task.repository";
import { IndexTask } from "../models/index-task";
import { v4 as uuid } from "uuid";
import { MockSearchEngine } from "../external/search-engine.mock";
import { log } from "../utils/logger";

export class IndexService {
  private repo = new TaskRepository();
  private searchEngine = new MockSearchEngine();

  async startIndexing(sourceId: string, sourcePath: string, correlationId: string) {
    const existing = this.repo.findRunningTask(sourceId);
    if (existing) return existing;

    const task: IndexTask = {
      id: uuid(),
      sourceId,
      status: 'PENDING',
      createdAt: new Date()
    };

    this.repo.create(task);
    log(correlationId, `Created task ${task.id} for source ${sourceId}`);
    
    // simulate async background worker
    this.processIndexJob(task.id, sourcePath, correlationId);

    return task;
  }

  private async processIndexJob(taskId: string, sourcePath: string, correlationId: string) {
    const task = this.repo.get(taskId);
    if (!task || task.status === 'CANCELLED') return;

    try {
      this.repo.updateStatus(taskId, 'RUNNING');
      log(correlationId, `Processing task ${taskId}`);
      await this.searchEngine.indexSource(sourcePath);
      this.repo.updateStatus(taskId, 'SUCCESS');
      log(correlationId, `Task ${taskId} finished successfully`);
    } catch (err: any) {
      this.repo.updateStatus(taskId, 'FAILED', err.message);
      log(correlationId, `Task ${taskId} failed: ${err.message}`);
    }
  }

  getTaskStatus(taskId: string) {
    return this.repo.get(taskId);
  }

  async cancelTask(taskId: string, correlationId: string) {
    const task = this.repo.get(taskId);
    if (!task) throw new Error("Task not found");
    if (task.status !== "RUNNING" && task.status !== "PENDING") {
      return task;
    }
    this.repo.updateStatus(taskId, "CANCELLED");
    log(correlationId, `Task ${taskId} cancelled`);
    return task;
  }

  async reindexSource(sourceId: string, sourcePath: string, correlationId: string) {
    return this.startIndexing(sourceId, sourcePath, correlationId);
  }
}