import { JSX } from "react";
import styles from "./Footer.module.css";

function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <p className={styles.logo}>PRESENTECH</p>
    </footer>
  );
}

export default Footer;
