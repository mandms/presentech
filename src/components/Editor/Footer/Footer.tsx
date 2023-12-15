import { JSX } from "react";
import styles from "./Footer.module.css";

function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles["left-col"]}></div>
      <div className={styles["right-col"]}>
        <textarea name="description" className={styles.textarea}></textarea>
      </div>
    </footer>
  );
}

export default Footer;
