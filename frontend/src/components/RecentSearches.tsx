import { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const RecentSearches: React.FC = () => {
  const { recentSearches, searchDuck } = useActions();

  const { data, error, loading } = useTypedSelector(
    (state) => state.recentSearches
  );
  useEffect(() => {
    recentSearches();
  }, []);

  return (
    <div>
      <b>Recent Searches</b>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {data && data.length > 0 && (
        <ul className="list-group">
          {data.map((search, i) => (
            <li
              className="list-group-item"
              key={i}
              onClick={() => {
                searchDuck(search, 0);
              }}
            >
              {search}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentSearches;
