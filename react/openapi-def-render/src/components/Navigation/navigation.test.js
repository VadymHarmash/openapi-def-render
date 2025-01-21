import { render, screen } from "@testing-library/react";
import { DefinitionContext } from "../../context/definitionContext";
import { Navigation } from "./index";

describe("Navigation Component", () => {
  const mockDefinition = {
    paths: {
      "/path1": {
        GET: {
          summary: "Get path1 data",
        },
      },
      "/path2": {
        POST: {
          summary: "Create data at path2",
        },
      },
    },
  };

  test("renders the title 'API Navigation'", () => {
    render(
      <DefinitionContext.Provider value={{ definition: mockDefinition }}>
        <Navigation />
      </DefinitionContext.Provider>,
    );

    expect(screen.getByText(/API Navigation/i)).toBeInTheDocument();
  });

  test("renders paths correctly when paths data is present", () => {
    render(
      <DefinitionContext.Provider value={{ definition: mockDefinition }}>
        <Navigation />
      </DefinitionContext.Provider>,
    );

    expect(screen.getByText(/Path: \/path1/i)).toBeInTheDocument();
    expect(screen.getByText(/Path: \/path2/i)).toBeInTheDocument();
  });

  test("links have correct hrefs pointing to path ids", () => {
    render(
      <DefinitionContext.Provider value={{ definition: mockDefinition }}>
        <Navigation />
      </DefinitionContext.Provider>,
    );

    const path1Link = screen.getByText(/Path: \/path1/i);
    const path2Link = screen.getByText(/Path: \/path2/i);

    expect(path1Link.getAttribute("href")).toBe("#path-/path1");
    expect(path2Link.getAttribute("href")).toBe("#path-/path2");
  });

  test("does not render anything if definition or paths are missing", () => {
    render(
      <DefinitionContext.Provider value={{ definition: null }}>
        <Navigation />
      </DefinitionContext.Provider>,
    );

    expect(screen.queryByText(/API Navigation/i)).toBeNull();
  });
});
