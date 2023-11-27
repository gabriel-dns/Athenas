import './banner.css'
import { Link } from 'react-router-dom'


const banner = () => (
    <section className='banner'>
        <p>
            O Athena é um facilitador de estudos projetado para uma experiência dinâmica e multímidia
        </p>

        <h1>
            Sua companhia de estudos
        </h1>

        <Link to='/panel'>
            <button className='start'>
                Comece já!
            </button>
        </Link>

    </section>

)


export default banner