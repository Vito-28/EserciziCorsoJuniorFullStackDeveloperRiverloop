// Componente di paginazione
// Props:
// - page: pagina attuale (numero)
// - totalPages: numero totale di pagine
// - onChange: funzione da chiamare quando si cambia pagina
export default function Pagination({ page, totalPages, onChange }) {
  // Se c'è solo una pagina, non mostrare la paginazione
  if (totalPages <= 1) return null;

  // Array di numeri da 1 a totalPages
  const nums = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Paginazione"
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        margin: "12px 0",
      }}
    >
      {/* Bottone pagina precedente */}
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        ← Precedente
      </button>

      {/* Bottoni numerici */}
      {nums.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          style={{ fontWeight: n === page ? 700 : 400 }}
        >
          {n}
        </button>
      ))}

      {/* Bottone pagina successiva */}
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Successiva →
      </button>
    </nav>
  );
}
