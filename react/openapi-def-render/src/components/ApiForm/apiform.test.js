import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DefinitionContext } from "../../context/definitionContext";
import { ApiForm } from "./index";
import * as yaml from "js-yaml";

const mockSetDefinition = jest.fn();
const MockContextProvider = ({ children }) => (
  <DefinitionContext.Provider value={{ setDefinition: mockSetDefinition }}>
    {children}
  </DefinitionContext.Provider>
);

describe("ApiForm", () => {
  beforeEach(() => {
    mockSetDefinition.mockClear();
  });

  test("correctly handles JSON file format", async () => {
    const file = new Blob([JSON.stringify({ paths: {} })], { type: "application/json" });
    render(
      <MockContextProvider>
        <ApiForm />
      </MockContextProvider>
    );
    const input = screen.getByLabelText(/choose file/i);

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockSetDefinition).toHaveBeenCalledTimes(1);
      expect(mockSetDefinition).toHaveBeenCalledWith({ paths: {} });
    });
  });

  test("correctly handles YAML file format", async () => {
    const yamlContent = "paths:\n  /example:\n    get:\n      summary: Test API";
    const file = new Blob([yamlContent], { type: "application/x-yaml" });
    render(
      <MockContextProvider>
        <ApiForm />
      </MockContextProvider>
    );
    const input = screen.getByLabelText(/choose file/i);

    fireEvent.change(input, { target: { files: [file] } });

    const parsedYaml = yaml.load(yamlContent);
    await waitFor(() => {
      expect(mockSetDefinition).toHaveBeenCalledTimes(1);
      expect(mockSetDefinition).toHaveBeenCalledWith(parsedYaml);
    });
  });

  test("does not accept files without extension", async () => {
    const file = new Blob([""], { type: "application/octet-stream" });
    render(
      <MockContextProvider>
        <ApiForm />
      </MockContextProvider>
    );
    const input = screen.getByLabelText(/choose file/i);

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockSetDefinition).not.toHaveBeenCalled();
    });
  });
});
