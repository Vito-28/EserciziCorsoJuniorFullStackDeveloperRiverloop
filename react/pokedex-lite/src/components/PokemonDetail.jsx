// Mostra i dettagli del Pokemon selezionato (immagine, tipi, stats)
import { useAPI } from "../hooks/useAPI";

export default function PokemonDetail({ name, onClose }) {
  // fetch dell'endpoint dinamico /pokemon/{name}
  const { data, loading, error } = useAPI(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );

  return (
    <section style={{ marginTop: 16, borderTop: "1px solid #eee", paddingTop: 16 }}>
      <button onClick={onClose}>Chiudi</button>

      {loading && <p>Caricamento dettagli...</p>}
      {error && <p>Errore: {error}</p>}

      {data && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr",
            gap: 16,
            alignItems: "center",
          }}
        >
          <img
            src={
              data.sprites?.other?.["official-artwork"]?.front_default ||
              data.sprites?.front_default
            }
            alt={name}
            width="120"
            height="120"
            loading="lazy"
          />
          <div>
            <h2 style={{ textTransform: "capitalize", margin: "0 0 8px" }}>
              {data.name}
            </h2>
            <p>
              <strong>Tipo:</strong>{" "}
              {data.types.map((t) => t.type.name).join(", ")}
            </p>
            <p>
              <strong>Altezza:</strong> {data.height} ·{" "}
              <strong>Peso:</strong> {data.weight}
            </p>
            <p>
              <strong>Stats:</strong>{" "}
              {data.stats
                .map((s) => `${s.stat.name}:${s.base_stat}`)
                .join(" · ")}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
