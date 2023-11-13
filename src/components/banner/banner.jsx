import './banner.css'
import {Link} from 'react-router-dom'


const banner = () => (
    <section className='banner'>

        <p>
            Projetado para estudantes
        </p>

        <h1>
        Facilitador de Leitura
        </h1>

        <Link to='/panel'>
        <button className='start'>
            Comece já!
        </button>
        </Link>

    </section>

    )
    
        
export default banner