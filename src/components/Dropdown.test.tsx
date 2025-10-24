import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Dropdown } from "./Dropdown";


const options = [
  { label: "Red", value: "#ff0000" },
  { label: "Green", value: "#00ff00" },
  { label: "Blue", value: "#0000ff" },
];

describe("Dropdown Component", () => {
  it("renders with label and placeholder", () => {
    render(<Dropdown dropdownLabel="Colors" options={options} onSelect={() => { }} />);
    expect(screen.getByText("Colors")).toBeInTheDocument();
    expect(screen.getByText("Select...")).toBeInTheDocument();
  });

  it("opens dropdown on click", () => {
    render(<Dropdown dropdownLabel="Colors" options={options} onSelect={() => { }} />);
    const header = screen.getByText("Select...");
    fireEvent.click(header);
    expect(screen.getByText("Red")).toBeInTheDocument();
  });

  it("selects an option when clicked", () => {
    const onSelect = vi.fn();
    render(<Dropdown dropdownLabel="Colors" options={options} onSelect={onSelect} />);
    const header = screen.getByText("Select...");
    fireEvent.click(header);

    const redOption = screen.getByText("Red");
    fireEvent.click(redOption);

    expect(onSelect).toHaveBeenCalledWith("Red");
    expect(screen.getByText("Red")).toBeInTheDocument();
  });

  it("handles keyboard navigation and selection", () => {
    const onSelect = vi.fn();
    render(<Dropdown dropdownLabel="Colors" options={options} onSelect={onSelect} />);
    const header = screen.getByText("Select...");

    // Open dropdown with keyboard
    fireEvent.keyDown(header, { key: "ArrowDown" });
    expect(screen.getByText("Red")).toBeInTheDocument();

    // Navigate down and select
    fireEvent.keyDown(header, { key: "ArrowDown" });
    fireEvent.keyDown(header, { key: "Enter" });

    expect(onSelect).toHaveBeenCalled();
  });

  it("closes when clicking outside", () => {
    render(<Dropdown dropdownLabel="Colors" options={options} onSelect={() => { }} />);
    const header = screen.getByText("Select...");
    fireEvent.click(header);
    expect(screen.getByText("Red")).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document.body);
    // Dropdown should close
    expect(screen.queryByText("Red")).not.toBeInTheDocument();
  });

  it("updates palette color on change", () => {
    render(<Dropdown dropdownLabel="Colors" options={options} onSelect={() => { }} />);
    const colorPicker = screen.getByLabelText("Palette:");
    fireEvent.change(colorPicker, { target: { value: "#123456" } });
    expect((colorPicker as HTMLInputElement).value).toBe("#123456");
  });
});
