// Card minimale: mostra il nome e un bottone "Dettagli"
export default function PokemonItem({ pokemon, onSelect }) {
  return (
    <li
      style={{
        listStyle: "none",
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
      }}
    >
      <h3 style={{ textTransform: "capitalize", margin: "0 0 8px" }}>
        {pokemon.name}
      </h3>
      <button onClick={() => onSelect(pokemon.name)}>Dettagli</button>
    </li>
  );
}
