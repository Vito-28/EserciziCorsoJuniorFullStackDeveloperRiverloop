// Input controllato: value arriva dal genitore, onChange aggiorna lo stato nel parent
export default function SearchBar({ value, onChange, placeholder = "Cerca..." }) {
  return (
    <div style={{ margin: "12px 0" }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Cerca"
        style={{ padding: "8px 12px", width: "100%", maxWidth: 420 }}
      />
    </div>
  );
}
