import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

export interface searchResult {
  url: string;
  title: string;
}
export interface searchResults extends Array<searchResult> {}

const RepositoriesList: React.FC = () => {
  const { highlightText } = useActions();
  const { text: highlighted, counter } = useTypedSelector(
    (state) => state.highlight
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    highlightText(event.target.value);
  };

  return (
    <div>
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="highlightText">Hightlight</label>
          <div className="input-group">
            <input
              id="highlightText"
              className="form-control"
              value={highlighted}
              onChange={onChange}
            />
            <div className="input-group-addon">{counter}</div>
          </div>
        </div>
        {/* <span className="label label-default">{counter}</span> */}
      </form>
    </div>
  );
};

export default RepositoriesList;
