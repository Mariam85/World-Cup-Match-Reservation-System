
import ViewMatchFan from './viewMatchDetailsFansServices';
import "./ViewMatchDetailsFan.css"
import MatchFan from '../MatchFan';

function ViewMatchDetailsFans(){

    const Request = ViewMatchFan();
    // console.log("Match request details", Request)
    return(
        <div className='container-fluid viewMatch'>
            <MatchFan matches={Request}/>
        </div>
    )
}
export default ViewMatchDetailsFans