import { Link } from "react-router-dom"

const Header = () => {
    return (
      <div style={{backgroundColor: "black", height: "30px"}}>
        <Link to="/">Dashboard</Link>
        <Link to="/containers">Containers</Link>
      </div>
    );
  }

export default Header