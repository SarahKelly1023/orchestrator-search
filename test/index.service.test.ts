import { IndexService } from "../src/services/index.service";

describe("IndexService", () => {
  const service = new IndexService();

  it("creates a new indexing task", async () => {
    const task = await service.startIndexing("source1", "/path/to/source", "test-id");
    expect(task.status).toBe("PENDING");
  });

  it("does not duplicate running tasks", async () => {
    const t1 = await service.startIndexing("source2", "/p1", "test-id");
    const t2 = await service.startIndexing("source2", "/p1", "test-id");
    expect(t1.id).toBe(t2.id);
  });

  it("can cancel a running task", async () => {
    const task = await service.startIndexing("source3", "/path3", "test-id");
    const cancelled = await service.cancelTask(task.id, "test-id");
    expect(cancelled.status).toBe("CANCELLED");
  });

  it("can reindex a source", async () => {
    const task = await service.reindexSource("source4", "/path4", "test-id");
    expect(task.status).toBe("PENDING");
  });
});