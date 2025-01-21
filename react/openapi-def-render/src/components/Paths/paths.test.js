import { render, screen } from "@testing-library/react";
import { DefinitionContext } from "../../context/definitionContext";
import { Paths } from "./index";

describe("Paths Component", () => {
  const mockDefinition = {
    paths: {
      "/path1": {
        GET: {
          summary: "Get path1 data",
          description: "Description for path1",
          parameters: [
            { name: "param1", in: "query", type: "string" },
            { name: "param2", in: "query", type: "number" },
          ],
          responses: {
            200: { description: "Successful response" },
          },
        },
      },
      "/path2": {
        POST: {
          summary: "Create data at path2",
          description: "Description for path2",
          parameters: [{ name: "param1", in: "body", type: "object" }],
          responses: {
            200: { description: "Resource created" },
          },
        },
      },
    },
  };

  test("renders paths correctly", () => {
    render(
      <DefinitionContext.Provider value={{ definition: mockDefinition }}>
        <Paths />
      </DefinitionContext.Provider>,
    );

    expect(screen.getByText(/Path: \/path1/i)).toBeInTheDocument();
    expect(screen.getByText(/Path: \/path2/i)).toBeInTheDocument();
  });

  test("renders parameters correctly", () => {
    render(
      <DefinitionContext.Provider value={{ definition: mockDefinition }}>
        <Paths />
      </DefinitionContext.Provider>,
    );

    expect(screen.getByText(/param1 \(query\)/i)).toBeInTheDocument();
    expect(screen.getByText(/param2 \(query\)/i)).toBeInTheDocument();
  });

  test("does not render anything if definition or paths are missing", () => {
    render(
      <DefinitionContext.Provider value={{ definition: null }}>
        <Paths />
      </DefinitionContext.Provider>,
    );

    expect(screen.queryByText(/Path:/i)).toBeNull();
  });
});
