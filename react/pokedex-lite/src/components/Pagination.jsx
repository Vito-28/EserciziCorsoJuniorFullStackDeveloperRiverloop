// Paginazione semplice: Prev/Next + numeri, con aria-current sulla pagina attiva
export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const nums = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Paginazione"
      style={{ display: "flex", gap: 8, margin: "12px 0", alignItems: "center" }}
    >
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        ← Prev
      </button>

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

      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Next →
      </button>
    </nav>
  );
}
