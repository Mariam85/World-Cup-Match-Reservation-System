import ViewMatch from './ViewMatchDetailsServices'
import Match from '../Match';
import "./ViewMatchDetails.css"

function ViewMatchDetails(){

    const Request = ViewMatch();
    return(
        <div className='container-fluid viewMatch'>
            <Match matches={Request}/>
        </div>
    )
}
export default ViewMatchDetails