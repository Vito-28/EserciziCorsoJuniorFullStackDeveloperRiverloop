import PokemonItem from "./PokemonItem";

// Mostra la griglia dei risultati (pagina corrente, eventualmente filtrata)
export default function PokemonList({ items, onSelect }) {
  if (!items.length) return <p>Nessun Pokémon trovato.</p>;

  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 12,
        padding: 0,
      }}
    >
      {items.map((p) => (
        <PokemonItem key={p.name} pokemon={p} onSelect={onSelect} />
      ))}
    </ul>
  );
}
