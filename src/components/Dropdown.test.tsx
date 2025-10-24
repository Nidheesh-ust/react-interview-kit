import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Dropdown } from "./Dropdown";

describe("Dropdown Component", () => {
  const options = ["Red", "Green", "Blue"];

  it("opens and closes when clicked", () => {
    render(<Dropdown label="Colors" options={options} onSelect={vi.fn()} />);

    // initially closed
    expect(screen.queryByText("Red")).not.toBeInTheDocument();

    // open
    fireEvent.click(screen.getByText("Select..."));
    expect(screen.getByText("Red")).toBeInTheDocument();

    // close
    fireEvent.click(screen.getByText("Select..."));
    expect(screen.queryByText("Red")).not.toBeInTheDocument();
  });

  it("selects an option and closes", () => {
    const onSelect = vi.fn();
    render(<Dropdown label="Colors" options={options} onSelect={onSelect} />);

    // open dropdown
    fireEvent.click(screen.getByText("Select..."));
    fireEvent.click(screen.getByText("Green"));

    // onSelect called
    expect(onSelect).toHaveBeenCalledWith("Green");

    // closed after selection
    expect(screen.queryByText("Red")).not.toBeInTheDocument();

    // selected value displayed
    expect(screen.getByText("Green")).toBeInTheDocument();
  });

  it("opens and closes using keyboard (Enter / Escape)", () => {
    render(<Dropdown label="Colors" options={options} onSelect={vi.fn()} />);
    const dropdownBox = screen.getByText("Select...");

    // open with Enter
    fireEvent.keyDown(dropdownBox, { key: "Enter" });
    expect(screen.getByText("Red")).toBeInTheDocument();

    // close with Escape
    fireEvent.keyDown(dropdownBox, { key: "Escape" });
    expect(screen.queryByText("Red")).not.toBeInTheDocument();
  });
});
