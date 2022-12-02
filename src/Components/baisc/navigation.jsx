import React, {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAdd, faCaretRight, faChartLine, faGlobe, faHome} from '@fortawesome/free-solid-svg-icons'
import Logo from "./logo";
import Logout from "./logout";
import CreateWorkSpace from "../operations/createWorkSpace";
import {dataProvider, loginProvider} from "../../App";
import {Link} from "react-router-dom";
import useAxios from "../customHooks/useAxios";
import ShowSpacesName from "../operations/showSpacesName";


export default function Navigation() {

    const {response, request} = useAxios()
    const [flag, setFlag] = useState(false)
    const [active, setActive] = useState(false)
    const {spaces, setSpaces} = useContext(dataProvider)
    const [dashboard, setDashboard] = useState(false)
    const {userId} = useContext(loginProvider)

    useEffect(() => {
        if (dashboard || !active || !flag) {
            request('GET', 'http://localhost:3001')
            setSpaces(response)
        }
        return (
            setDashboard(true)
        )
    }, [dashboard, active, flag, response])

    return (
        <div className="navigation">
            <Logo/>
            <ul>
                <li>
                    <Link to="/" className="link">
                        <FontAwesomeIcon className='icon' icon={faHome}/>
                        <span >Home</span>
                    </Link>
                </li>
                <li>
                    <Link onClick={() => setDashboard(false)} to="/Dashboard" className="link">
                        <FontAwesomeIcon className='icon' icon={faChartLine}/>
                        <span >Dashboard</span>
                    </Link>
                </li>
                <li>
                    <FontAwesomeIcon className='icon' icon={faGlobe}/>
                    <span > spaces
                    <FontAwesomeIcon style={{paddingLeft: '1rem', fontSize: '15px'}} icon={faAdd}
                                     onClick={() => setFlag(!flag)}/>
                    <FontAwesomeIcon style={{paddingLeft: '1rem', fontSize: '15px'}} icon={faCaretRight}
                                     onClick={() => {
                                         setActive(!active)
                                     }}/></span>
                </li>
                {active
                    ? spaces.map(space => {
                        if (space.user === userId) {
                            return <ShowSpacesName key={space._id} space={space}/>
                        }
                    })
                    : null}
                {flag
                    ? <CreateWorkSpace flag={flag} setFlag={setFlag}/>
                    : null}
                <Logout/>
            </ul>
        </div>
    );
}