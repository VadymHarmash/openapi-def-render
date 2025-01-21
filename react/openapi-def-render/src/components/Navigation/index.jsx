import React, { useContext } from "react";
import { DefinitionContext } from "../../context/definitionContext";
import styles from "./navigation.module.scss";

export const Navigation = () => {
  const { definition } = useContext(DefinitionContext);

  if (!definition || !definition.paths) return null;

  return (
    <div className={styles.navigation}>
      <h2>API Navigation</h2>
      <ul>
        {Object.entries(definition.paths).map(([path, methods]) => (
          <li key={path}>
            <h3>Path: {path}</h3>
            <ul>
              {Object.entries(methods).map(([method, details]) => (
                <li key={method}>
                  <span className={`${styles[`${method.toLowerCase()}`]}`}>
                    {method}
                  </span>
                  {details.summary && <p>{details.summary}</p>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
