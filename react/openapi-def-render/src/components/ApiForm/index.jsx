import React, { useEffect, useState } from "react";
import yaml from "js-yaml";
import { Paths } from "../Paths";

export const ApiForm = () => {
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

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
          "Invalid file format. Please upload a valid OpenAPI JSON or YAML file.",
        );
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h1>OpenAPI Renderer</h1>
      <div>
        <h2>
          Upload OpenAPI Definition (choose your file manually or drag it)
        </h2>
        <input type="file" onChange={handleFileUpload} />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h2>Paths</h2>
        <Paths definition={definition} />
      </div>
    </div>
  );
};
