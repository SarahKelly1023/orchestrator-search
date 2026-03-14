import { log } from "../utils/logger";

export interface SearchResult {
  id: string;
  title: string;
}

export interface SearchEngine {
  indexSource(sourcePath: string): Promise<void>;
  search(query: string): Promise<SearchResult[]>;
}

export class MockSearchEngine implements SearchEngine {
  async indexSource(sourcePath: string) {
    await new Promise(r => setTimeout(r, 1000));
    log("MOCK", `Indexed source ${sourcePath}`);
  }

  async search(query: string): Promise<SearchResult[]> {
    return [
      { id: "1", title: `Document containing ${query}` },
      { id: "2", title: `Another document with ${query}` }
    ];
  }
}