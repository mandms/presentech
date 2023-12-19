import styles from "./Alert.module.css";
import { Status } from "./Alert.types.ts";

interface IErrorProps {
  title: string;
  message: string;
  status: Status;
  onClose: () => void;
}

function Alert({ title, message, status, onClose }: IErrorProps): JSX.Element {
  const errorStyle = () => {
    switch (status) {
      case Status.ERROR:
        return styles.error;
      case Status.PRIMARY:
        return styles.primary;
      case Status.SUCCESS:
        return styles.success;
    }
  };

  return (
    <div className={[styles.box, errorStyle()].join(" ")}>
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
      <button onClick={onClose}>close</button>
    </div>
  );
}

export default Alert;
