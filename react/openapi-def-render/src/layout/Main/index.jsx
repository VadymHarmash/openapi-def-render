import React from "react";
import { Navigation } from "../../components/Navigation";
import { Paths } from "../../components/Paths";
import styles from "./main.module.scss";

export const Main = () => {
  return (
    <main className="container">
      <div className={styles.main__wrapper}>
        <Navigation />
        <Paths />
      </div>
    </main>
  );
};
