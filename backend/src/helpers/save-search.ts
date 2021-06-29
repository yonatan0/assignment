import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";

import { promisify } from "util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const searchesPath = path.resolve(__dirname, "../data");
const searchesFilename = path.resolve(__dirname, "../data/searches.json");

export const saveSearchTerm = async (term: string) => {
  try {
    const rawFile = await readFile(searchesFilename, "utf-8");
    const searches = JSON.parse(rawFile);
    const index = searches.terms.indexOf(term);

    if (index != -1) {
      // term exists, move to first
      searches.terms.splice(index, 1);
    }
    searches.terms.unshift(term);

    // keep only last 10 search terms
    if (searches.terms.length > 10) {
      searches.terms.pop();
    }
    await writeFile(searchesFilename, JSON.stringify(searches), "utf-8");
  } catch (e: any) {
    await initialFile(searchesPath, searchesFilename, [term]);
  }
};

export const loadRecentSearches = async () => {
  try {
    const rawFile = await readFile(searchesFilename, "utf-8");
    const searches = JSON.parse(rawFile);
    return searches.terms;
  } catch (e: any) {
    await initialFile(searchesPath, searchesFilename);
    return [];
  }
};

const initialFile = async (p: any, f: any, terms: string[] = []) => {
  await mkdirp(p);
  await writeFile(f, JSON.stringify({ terms }), "utf-8");
};
