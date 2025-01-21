import React, { useContext } from "react";
import { DefinitionContext } from "../../context/definitionContext";
import styles from "./paths.module.scss";

export const Paths = () => {
  const { definition } = useContext(DefinitionContext);
  if (!definition || !definition.paths) return null;

  return (
    <div className={styles.paths}>
      {Object.entries(definition.paths).map(([path, methods]) => (
        <div key={path} style={{ marginBottom: "2rem" }}>
          <h3>Path: {path}</h3>
          {Object.entries(methods).map(([method, details]) => (
            <div key={method} style={{ marginBottom: "1rem", paddingLeft: "1rem" }}>
              <strong>Method:</strong> {method.toUpperCase()}
              <br />
              <strong>Summary:</strong> {details.summary || "N/A"}
              <br />
              <strong>Description:</strong> {details.description || "N/A"}
              <br />
              <strong>Parameters:</strong>
              <ul>
                {(details.parameters || []).map((param, index) => (
                  <li key={index}>
                    {param.name} ({param.in}): {param.type || param.schema?.type || "N/A"}
                  </li>
                ))}
              </ul>
              <strong>Responses (200):</strong>
              <pre style={{ backgroundColor: "#f4f4f4", padding: "1rem" }}>
                {JSON.stringify(details.responses?.["200"], null, 2) || "N/A"}
              </pre>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
