import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'

const Header = ({ token, setUser }) => {
  const navigate = useNavigate()
  return (
    <div className="headerbloc">
      <div className="logo">
        <img
          style={{ height: 50, width: 100, marginLeft: 40 }}
          src={logo}
          alt=""
        />
      </div>

      <div>
        <input
          className="search"
          type="text"
          placeholder="rechercher des articles"
        />
      </div>

      {token ? (
        <button
          className="deconnect"
          onClick={() => {
            setUser(null)
            navigate('/')
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <div className="buttons">
          <div className="inscription">
            <button>
              <Link to="/signup">S'inscrire</Link>
            </button>
          </div>

          <div className="connect">
            <button>
              <Link to="/login">Se connecter</Link>{' '}
            </button>
          </div>
        </div>
      )}

      <div className="vente">
        <button>
          <Link to="/publish">Vends tes articles</Link>
        </button>
      </div>
    </div>
  )
}

export default Header
