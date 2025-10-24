import { Dropdown } from "./components/Dropdown"
function App() {
  const handleSelect = (value: string) => {
    console.log("Selected:", value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Simple Dropdown</h2>
      <Dropdown
        label="Pick a color"
        options={["Red", "Green", "Blue"]}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default App;
