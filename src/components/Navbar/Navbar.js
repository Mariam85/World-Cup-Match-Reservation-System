
import FIFA from '../images/FIFA-logo.png'
import './Navbar.css'

function Navbar(){
    return(
        <div className="nav-bar">
            <img src = {FIFA} alt = 'logo' className='logo'/> 
        </div>
    )
}

export default Navbar