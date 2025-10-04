import { render, screen } from "@testing-library/react";
import React from "react";

function Dummy() {
  return <h1>Olá, SaaS V3!</h1>;
}

test("renderiza título", () => {
  render(<Dummy />);
  expect(screen.getByText("Olá, SaaS V3!")).toBeInTheDocument();
});
