import { Request, Response } from "express";
import axios from "axios";

export interface searchResult {
  url: string;
  title: string;
}
export interface searchResults extends Array<searchResult> {}

export const search = async (term: string): Promise<searchResults> => {
  let results: searchResults = [];
  try {
    const { data } = await axios.get(
      `https://api.duckduckgo.com/?q=${term}&format=json`
    );
    if (data) {
      for (const result of data.RelatedTopics) {
        // RelatedTopic has some results without topic and some with topic
        if (result.Name) {
          // result is in a topic
          const subTopics = result.Topics;
          for (const subTopic of subTopics) {
            results.push(getSearchResult(subTopic));
          }
        } else {
          // not in topic
          results.push(getSearchResult(result));
        }
      }
    }
  } catch (e) {
    throw new Error("Failed to fetch data from duckduckgo");
  }
  return results;
};

const getSearchResult = (result: any): searchResult => {
  return {
    url: result.FirstURL,
    title: result.Text,
  };
};
