//Pagina di dettaglio per un singolo utente
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function UseraDetail() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //fetch dettaglio utente
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then((res) => {  // risposta grezza ottenuta
            if(!res.ok) throw new Error("Errore HTTP " + res.status);  // controlliamo se valida
            return res.json();  // se ok la convertiamo in JSON
    })
    .then(setUser)   // se arrivca bene la salviamo nello stato con setUser
    .catch((e) => setError(e.message))   // se va male gestiamo l'errore
    .finally(() => setLoading(false));   // in ogni caso alla fine spegniamo loading
}, [id]);

//RENDER CONDIZIONALE

if (loading) return <p>Caricamento dettagli...</p>;
if (error) return <p>Errore: {error}</p>;
if (!user) return <p>Nessun utente trovato.</p>

return (
    <div>
        <h1>{user.name}</h1>
        <p><strong>Email:</strong>{user.email}</p>
        <p><strong>Telefono:</strong>{user.phone}</p> 
        <p><strong>Azienda:</strong>{user.company.name}</p>
  

    <Link to="/users">Torna alla lista utenti</Link>
      </div>
     );
}