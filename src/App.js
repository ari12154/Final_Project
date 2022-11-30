import React, {createContext, useEffect, useState} from "react";
import Login from "./Components/baisc/login";
import Header from "./Components/baisc/header";
import Navigation from "./Components/baisc/navigation";
import Logout from "./Components/baisc/logout";
import useLocalStorage from './Components/customHooks/useLocalStorage';
import useAxios from "./Components/customHooks/useAxios";
import Body from "./Components/baisc/body";
import BodyData from "./Components/baisc/bodyData";
import Dashboard from "./Components/baisc/dashboard";
import {Route, Routes} from "react-router-dom";


export const loginProvider = createContext()
export const dataProvider = createContext()

function App() {

    const [login, setLogin] = useLocalStorage('login', false)
    const [opacityBody, setOpacityBody] = useState(false)
    const [spaceName, setSpaceName] = useState('')
    const [userId, setUserId] = useState('')
    const {response, request} = useAxios()
    const [spaces, setSpaces] = useState(response)


    useEffect(() => {
        request('GET', 'http://localhost:3001')
        hasSameObjectsData(response, spaces)
    }, [spaces])


    const hasSameObjectsData = (response, spaces) => {
        let obj1Keys = Object.keys(response)
        let obj2Keys = Object.keys(spaces)

        if (obj1Keys.length === obj2Keys.length) {
            return obj1Keys.every(key => spaces.hasOwnProperty(key)
                && response[key].length === spaces[key].length
            )
                ? setSpaces(response)
                : spaces
        }
        return spaces
    }

    return (
        <loginProvider.Provider value={{login, setLogin, userId, setUserId}}>
            <dataProvider.Provider value={{
                setSpaces,
                spaces,
                opacityBody,
                setOpacityBody,
                setSpaceName,
            }}>
                <div className="App">
                    {!login
                        ? <Login/>
                        : <div style={{display: 'flex', minHeight: '70vh'}}>
                            <Navigation/>
                            <div style={{width: '85vw'}}>
                                <Body opacityBody={opacityBody}>
                                    <Routes>
                                        <Route path="/"
                                               element={<BodyData
                                                   spaces={spaces}
                                                   spaceName={spaceName}
                                                   setSpaceName={setSpaceName}
                                               />}/>
                                        <Route path="/Dashboard" element={<Dashboard spaces={spaces}/>}/>
                                    </Routes>
                                </Body>
                            </div>
                        </div>
                    }
                </div>
            </dataProvider.Provider>
        </loginProvider.Provider>

    )

}

export default App;
