import React, { useContext } from "react";
import { DefinitionContext } from "../../context/definitionContext";

export const Paths = () => {
  const { definition } = useContext(DefinitionContext);
  if (!definition || !definition.paths) return null;

  return Object.entries(definition.paths).map(([path, methods]) => (
    <>
      <h2>Paths</h2>
      <div key={path}>
        <h3>Path: {path}</h3>
        {Object.entries(methods).map(([method, details]) => (
          <div key={method} style={{ marginBottom: "1rem" }}>
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
                  {param.name} ({param.in}): {param.type || param.schema?.type}
                </li>
              ))}
            </ul>
            <strong>Responses (200):</strong>
            <pre>{JSON.stringify(details.responses?.["200"], null, 2)}</pre>
          </div>
        ))}
      </div>
    </>
  ));
};
