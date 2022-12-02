import React, {useContext, useEffect, useState} from 'react';
import Calendar from "../custom/calender";
import DoughnutChart from "../custom/DoughnutChart";
import 'chart.js/auto'
import '../../styleSheets/dashboard.css'
import '../../styleSheets/react-calander.css'
import BarChart from "../custom/BarChart";
import ThisWeekTasks from "../operations/thisWeekTasks";
import {loginProvider} from "../../App";
import Navigation from "./navigation";

function Dashboard({spaces}) {

    const {userId} = useContext(loginProvider)
    const [userSpaces, setUserSpaces] = useState(spaces)
    useEffect(() => {
        setUserSpaces(spaces.filter(space => space.user === userId))
    }, [])

    return (
        <>
            <div style={{display: 'flex', minHeight: '70vh'}}>
                <Navigation/>
                <div style={{width: '85vw'}}>
                    <div className='container'>
                        <DoughnutChart spaces={userSpaces}/>
                        <Calendar/>
                        <ThisWeekTasks spaces={userSpaces}/>
                        <BarChart spaces={userSpaces}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;