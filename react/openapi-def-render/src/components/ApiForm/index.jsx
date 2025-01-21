import React, { useContext, useEffect, useState } from "react";
import yaml from "js-yaml";
import { DefinitionContext } from "../../context/definitionContext";
import styles from "./apiform.module.scss";

export const ApiForm = () => {
  const [error, setError] = useState(null);
  const { setDefinition } = useContext(DefinitionContext);

  useEffect(() => {
    if (error) setDefinition(null);
  }, [error]);

  const parseDefinition = (content) => {
    try {
      return JSON.parse(content);
    } catch (e) {
      return yaml.load(content);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const parsedDefinition = parseDefinition(content);
        setDefinition(parsedDefinition);
        setError(null);
      } catch (error) {
        setError(
          "Invalid file format. Please upload a valid OpenAPI JSON or YAML file."
        );
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className={styles.apiform}>
      <h1>OpenAPI Renderer</h1>
      <h2>Upload OpenAPI Definition (choose your file manually or drag it)</h2>
      <div className={styles["file-input-wrapper"]}>
        <label className={styles["custom-file-input"]}>
          Choose File
          <input type="file" onChange={handleFileUpload} />
        </label>
      </div>
      {error && <p className={styles.apiform__error}>{error}</p>}
    </div>
  );
};
