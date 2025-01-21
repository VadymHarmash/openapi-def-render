import React, { useContext } from "react";
import { DefinitionContext } from "../../context/definitionContext";
import styles from "./navigation.module.scss";

export const Navigation = () => {
  const { definition } = useContext(DefinitionContext);

  if (!definition || !definition.paths) return null;

  return (
    <div className={styles.navigation}>
      <h2>API Navigation</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {Object.entries(definition.paths).map(([path, methods]) => (
          <li key={path} style={{ marginBottom: "1rem" }}>
            <h3 style={{ color: "#007acc", marginBottom: "0.5rem" }}>
              Path: {path}
            </h3>
            <ul style={{ listStyleType: "none", paddingLeft: "1rem" }}>
              {Object.entries(methods).map(([method, details]) => (
                <li key={method} style={{ marginBottom: "0.5rem" }}>
                  <strong style={{ textTransform: "uppercase", color: "#555" }}>
                    {method}
                  </strong>
                  {details.summary && (
                    <p
                      style={{
                        margin: "0.5rem 0",
                        fontSize: "0.9rem",
                        color: "#333",
                      }}
                    >
                      {details.summary}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
