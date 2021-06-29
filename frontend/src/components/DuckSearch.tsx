import { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import ResultsItem from "./ResultsItem";
import HighlightTextInput from "./HighlightTextInput";
import ReactPaginate from "react-paginate";

export interface searchResult {
  url: string;
  title: string;
}
export interface searchResults extends Array<searchResult> {}

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const { searchDuck } = useActions();
  const {
    term: storedTerm,
    results,
    page,
    totalPages,
    error,
    loading,
  } = useTypedSelector((state) => state.search);

  useEffect(() => {
    if (storedTerm === term) return;

    setTerm(storedTerm);
  }, [storedTerm]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchDuck(term);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTerm(event.target.value);
  };

  const onPageChange = (newPage: any) => {
    searchDuck(term, newPage.selected);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <form className="form-inline" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Search"
                value={term}
                onChange={onChange}
              />
              <button className="btn btn-primary">Search</button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <HighlightTextInput />
        </div>
      </div>

      {term !== "" && totalPages > 0 && (
        <div className="row">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={totalPages}
            forcePage={page}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={onPageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
      {!error && !loading && storedTerm !== "" && results.length === 0 && (
        <h2>
          No search results for: '<b>{storedTerm}</b>'
        </h2>
      )}
      {!error && !loading && results.length > 0 && (
        <>
          <div className="row">
            {results.map((result: any) => (
              <div key={result.url}>
                <ResultsItem data={result} />
              </div>
            ))}
          </div>
        </>
      )}
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
    </div>
  );
};

export default RepositoriesList;
