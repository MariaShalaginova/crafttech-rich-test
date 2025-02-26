import { ControlProps } from "../../types/Types";
import styles from "./Control.module.scss";

const Control = ({ tool, setTool }: ControlProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTool(e.target.value);
  };

  const onClick = () => {
    setTool("clear");
  };

  return (
    <div className={styles.control}>
      <div className={styles.control__item}>
        <input
          type="radio"
          id="cursor"
          name="control"
          value="cursor"
          checked={tool === "cursor"}
          onChange={handleOnChange}
        />
        <label htmlFor="cursor">Взаимодействие</label>
      </div>

      <div className={styles.control__item}>
        <input
          type="radio"
          id="shape"
          name="control"
          value="shape"
          checked={tool === "shape"}
          onChange={handleOnChange}
        />
        <label htmlFor="shape">Добавление</label>
      </div>

      <div className={styles.control__item}>
        <button
          type="button"
          name="control"
          onClick={onClick}
          className={styles.control__button}
        >
          Очистить канву
        </button>
      </div>
    </div>
  );
};

export default Control;
