import { QuizzParamsActionType } from "../types/types";

interface IAppProps {
  rankingModeIsChecked: boolean;
  dispatchAction: any;
}

const Checkbox: React.FunctionComponent<IAppProps> = ({
  rankingModeIsChecked,
  dispatchAction,
}) => {
  return (
    <div>
      <input
        id="rakingMode"
        type="checkbox"
        checked={rankingModeIsChecked}
        onChange={() =>
          dispatchAction({ type: QuizzParamsActionType.TOGGLE_RANKING_MODE })
        }
      />
      <label htmlFor="rakingMode">
        {" "}
        Select if you want play in ranking mode 🏆
      </label>
    </div>
  );
};

export default Checkbox;
