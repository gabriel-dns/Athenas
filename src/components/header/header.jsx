import './header.css'
import {Link} from 'react-router-dom'


const header = () => (
    <header>
        <nav>
            {/* LOGO / TITULO */}
            <div className="logo">
                <h1>ATHENAS</h1>
                <p>Resolução de Problemas</p>
            </div>

            {/* MENU NAVEGAÇÃO */}
            <div className="menu">
                <ul className="itens">
                    <li> <a><span>Home</span> </a> </li>
                    <li> <a>Proposito</a> </li>
                    <li> <a>Contato</a> </li>
                    <li><Link to='/panel'><a> <button>TRY OUT</button> </a> </Link> </li>
                </ul>
            </div>
        </nav>
    </header>
)









export default header