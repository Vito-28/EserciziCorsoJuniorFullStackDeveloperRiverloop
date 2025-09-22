//Barra di navigazione con link alle pagine
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav 
          style={{ 
            display: "flex",
            gap: 16,
            background: "#0ea5e9",
            padding: "12px 20px",
          }}
          >
          <Link to="/" style={{ color: "white"}}>Home</Link>
          <Link to="/users" style={{ color: "white"}}>Users</Link> 
          <Link to="/about" style={{ color: "white"}}>About</Link> 
          </nav>
    );
}