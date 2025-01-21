import React, { useContext } from "react";
import { DefinitionContext } from "../../context/definitionContext";
import styles from "./paths.module.scss";

export const Paths = () => {
  const { definition } = useContext(DefinitionContext);
  if (!definition || !definition.paths) return null;

  return (
    <div className={styles.paths}>
      {Object.entries(definition.paths).map(([path, methods]) => (
        <div key={path} className={styles.paths__pathItem} id={`path-${path}`}>
          <h3>Path: {path}</h3>
          {Object.entries(methods).map(([method, details]) => (
            <div key={method} className={styles.paths__list}>
              <p>
                <span>Method:</span> {method.toUpperCase()}
              </p>
              <p>
                <span>Summary:</span> {details.summary || "N/A"}
              </p>
              <p>
                <span>Description:</span> {details.description || "N/A"}
              </p>
              <p>
                <span>Parameters:</span>
              </p>
              <ul>
                {(details.parameters || []).map((param, index) => (
                  <li key={index}>
                    {param.name} ({param.in}):{" "}
                    {param.type || param.schema?.type || "N/A"}
                  </li>
                ))}
              </ul>
              <strong>Responses (200):</strong>
              <pre>
                {JSON.stringify(details.responses?.["200"], null, 2) || "N/A"}
              </pre>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
