import { Dropdown } from "./components/Dropdown"
function App() {
  const handleSelect = (value: string) => {
    // TO DO - handle selection
  };

  const options = [
    { label: "Red ", value: "red" },
    { label: "Green ", value: "green" },
    { label: "Blue ", value: "blue" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Simple Dropdown</h2>
      <Dropdown
        dropdownLabel="Pick a color"
        options={options}
        onSelect={handleSelect}
        color="#dfcacaff" // optional, highlight color for selected item
      />
    </div>
  );
}

export default App;
