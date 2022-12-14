import { ChangeEvent, FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface Props {
  label: string;
  checked: boolean;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: FunctionComponent<Props> = ({
  label,
  checked,
  handleOnChange,
}) => {
  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          onChange={(e) => handleOnChange(e)}
          checked={checked}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default CheckBox;
