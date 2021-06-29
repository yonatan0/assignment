import { Request, Response } from "express";
import { saveSearchTerm, loadRecentSearches } from "../helpers/save-search";
import { search as duckSearch } from "../services/duckduckgo";

export const search = async (req: Request, res: Response) => {
  const limit = 5;
  let page: number = parseInt(req.query.page as string);
  if (!page || page < 0) page = 0;
  if (req.query.q) {
    const term: string = req.query.q as string;
    try {
      const results = await duckSearch(term);
      await saveSearchTerm(term);
      const fromIndex = page * limit;
      return res.send({
        data: results.slice(fromIndex, fromIndex + limit),
        page,
        totalPages: Math.floor(results.length / limit),
      });
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  }
};

export const recentSearches = async (req: Request, res: Response) => {
  const searches = await loadRecentSearches();
  return res.send(searches);
};
