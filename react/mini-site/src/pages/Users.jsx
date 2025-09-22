//Pagina che mostra lista utenti (API: JSONPlaceholder)
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Users() {

    // STATI 
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);


    //EFFETTO:FETCH 
    useEffect(() => {
        //fecth utenti
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
            if(!res.ok) throw new Error("Errore HTTP " + res.status);
            return res.json();
    })

    .then(setUsers)

    .catch((e) => setError(e.message))

    .finally(() => setLoading(false));
}, []);

//RENDER CONDIZIONALE

if (loading) return <p>Caricamento utenti...</p>;
if (error) return <p>Errore: {error}</p>;

return (
    <div>
        <h1>Lista Utenti</h1>
        <ul>
           {users.map((u) => (
            <li key={u.id}>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
            </li>
           ))}
        </ul>
    </div>
   );
}