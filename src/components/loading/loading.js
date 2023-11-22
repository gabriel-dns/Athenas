import loading from '../../images/loading.svg'
import './loading.css'

function Loading(){
    return(
        <div className='loading-container'>
            <img className='loading' src={loading} alt="Loading"/>
        </div>
    )
}

export default Loading