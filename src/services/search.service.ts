import { MockSearchEngine, SearchResult } from "../external/search-engine.mock";

export class SearchService {
  private searchEngine = new MockSearchEngine();

  async search(query: string): Promise<SearchResult[]> {
    return this.searchEngine.search(query);
  }
}