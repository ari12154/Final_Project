import {useContext} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {loginProvider} from "../../App";

export default function Logout() {

    const {setLogin} = useContext(loginProvider)

    return <li style={{marginTop: '3rem'}} onClick={() => {
        setLogin(false)
    }}><FontAwesomeIcon className='icon' icon={faArrowRightFromBracket}/>
        <span>Log-out</span></li>;
}
