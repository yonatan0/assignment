import { Provider } from "react-redux";
import { store } from "../state";
import DuckSearch from "./DuckSearch";
import RecentSearches from "./RecentSearches";

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <div className="page-header">
          <h1>DuckDuckGo</h1>
        </div>
        <div className="col-md-9">
          <DuckSearch />
        </div>
        <div className="col-md-3">
          <RecentSearches />
        </div>
      </div>
    </Provider>
  );
};

export default App;
