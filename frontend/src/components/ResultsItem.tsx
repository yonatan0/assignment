import { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { searchResult } from "./DuckSearch";

const ResultsItem: React.FC<{ data: searchResult }> = ({ data }) => {
  const { text: highlighted } = useTypedSelector((state) => state.highlight);
  const { highlightTextCounter } = useActions();

  const count = (str: any) => {
    const re = new RegExp(`(${highlighted})`, "gi");
    return ((str || "").match(re) || []).length;
  };

  useEffect(() => {
    if (!highlightTextCounter || highlighted === "") return;

    const appearance = count(data.title);
    highlightTextCounter(appearance);
  }, [highlighted, data.title]);

  const getHighlightedText = (text: any, highlight: any) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part: any, i: number) => {
          return (
            <span
              key={i}
              style={
                part.toLowerCase() === highlight.toLowerCase()
                  ? { backgroundColor: "yellow" }
                  : {}
              }
            >
              {part}
            </span>
          );
        })}
      </span>
    );
  };
  return (
    <div>
      <a href={data.url}>
        {getHighlightedText(data.title, highlighted)}
        {/* {
          <Highlighter
            searchWords={[highlighted]}
            autoEscape={true}
            textToHighlight={data.title}
          />
        } */}
      </a>
    </div>
  );
};

export default ResultsItem;
