// Dropdown.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Dropdown } from "./Dropdown";

describe("Dropdown Component", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const label = "Select an option";

  it("renders the label and default text", () => {
    const { getByText } = render(
      <Dropdown label={label} options={options} onSelect={() => {}} />
    );

    expect(getByText(label)).toBeTruthy();
    expect(getByText("Select...")).toBeTruthy();
  });

  it("opens and closes dropdown on click", async () => {
    const { getByText, queryByText } = render(
      <Dropdown label={label} options={options} onSelect={() => {}} />
    );

    const dropdown = getByText("Select...");
    fireEvent.click(dropdown);
    expect(getByText("Option 1")).toBeTruthy();

    fireEvent.click(dropdown);
    expect(queryByText("Option 1")).toBeNull();
  });

  it("calls onSelect when an option is clicked", () => {
    const onSelect = vi.fn();
    const { getByText } = render(
      <Dropdown label={label} options={options} onSelect={onSelect} />
    );

    fireEvent.click(getByText("Select..."));
    fireEvent.click(getByText("Option 2"));

    expect(onSelect).toHaveBeenCalledWith("Option 2");
  });

  it("navigates options with keyboard and selects with Enter", () => {
    const onSelect = vi.fn();
    const { getByText, queryByText } = render(
      <Dropdown label={label} options={options} onSelect={onSelect} />
    );

    const dropdown = getByText("Select...");
    dropdown.focus();

    // Open dropdown with ArrowDown
    fireEvent.keyDown(dropdown, { key: "ArrowDown" });
    expect(getByText("Option 1")).toBeTruthy();

    // Move highlight down to Option 2
    fireEvent.keyDown(dropdown, { key: "ArrowDown" });

    // Press Enter to select Option 2
    fireEvent.keyDown(dropdown, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("Option 2");

    // Dropdown should close
    expect(queryByText("Option 1")).toBeNull();
  });

  it("closes dropdown with Escape key", () => {
    const { getByText, queryByText } = render(
      <Dropdown label={label} options={options} onSelect={() => {}} />
    );

    const dropdown = getByText("Select...");
    fireEvent.click(dropdown); // open dropdown
    expect(getByText("Option 1")).toBeTruthy();

    fireEvent.keyDown(dropdown, { key: "Escape" });
    expect(queryByText("Option 1")).toBeNull();
  });
});
