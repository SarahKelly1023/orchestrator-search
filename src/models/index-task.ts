export type TaskStatus = 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

export interface IndexTask {
  id: string;
  sourceId: string;
  status: TaskStatus;
  createdAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
  errorMessage?: string;
}