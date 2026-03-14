import { IndexTask, TaskStatus } from "../models/index-task";

export class TaskRepository {
  private tasks: Map<string, IndexTask> = new Map();

  create(task: IndexTask) {
    this.tasks.set(task.id, task);
    return task;
  }

  get(taskId: string) {
    return this.tasks.get(taskId);
  }

  updateStatus(taskId: string, status: TaskStatus, errorMessage?: string) {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = status;
      if (status === 'RUNNING') task.startedAt = new Date();
      if (status === 'SUCCESS' || status === 'FAILED' || status === 'CANCELLED') task.finishedAt = new Date();
      if (errorMessage) task.errorMessage = errorMessage;
    }
    return task;
  }

  findRunningTask(sourceId: string) {
    return Array.from(this.tasks.values()).find(
      t => t.sourceId === sourceId && t.status === 'RUNNING'
    );
  }
}