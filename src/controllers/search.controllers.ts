import { Request, Response } from "express";
import { SearchService } from "../services/search.service";

const searchService = new SearchService();

export async function search(req: Request, res: Response) {
  const { q } = req.query;
  if (!q || typeof q !== "string") return res.status(400).json({ error: "Query required" });
  const results = await searchService.search(q);
  res.json({ results });
}