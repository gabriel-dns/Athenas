import './header.css'
import {Link} from 'react-router-dom'


const header = () => (
    <header>
        <nav>
            {/* LOGO / TITULO */}
            <div className="logo">
                <h1>ATHENA</h1>
            </div>

            {/* MENU NAVEGAÇÃO */}
            <div className="menu">
                <ul className="itens">
                    <li><Link to='/panel'><a> <button>COMEÇAR</button> </a> </Link> </li>
                </ul>
            </div>
        </nav>
    </header>
)

export default header