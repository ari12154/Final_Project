import React, {useContext, useEffect, useState} from "react";
import '../../styleSheets/spaces.css';
import useAxios from "../customHooks/useAxios";
import {dataProvider, loginProvider} from "../../App";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faS} from "@fortawesome/free-solid-svg-icons";


export default function CreateWorkSpace({flag, setFlag}) {

    const {response, request} = useAxios()
    const [name, setName] = useState('')
    const [nameExist, setNameExist] = useState('')
    const {spaces, setSpaces} = useContext(dataProvider)
    const [dataSaved, setDataSaved] = useState({})
    const {userId} = useContext(loginProvider)

    useEffect(() => {
        spaces.forEach(space => {
            if (name === space.name) {
                setNameExist(name)
            }
        })
            setDataSaved({
                id: Date.now(),
                user: userId,
                name: name,
                lists: []
            })
        request('GET', 'http://localhost:3001')
        hasSameObjectsData(spaces, response)
    }, [name, response])

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


    const createWorkSpace = (e) => {
        e.preventDefault()
        e.target.value = ''
        if (name && name !== nameExist) {
            request('POST', 'http://localhost:3001', dataSaved)
            setSpaces(response)
        }
        setName('')
        setFlag(!flag)
    }


    return <form
        style={{display: 'flex', alignItems: 'center', gap: '.1rem', margin: '.5rem 0 0 -1.8rem', width: '60%'}}
        onSubmit={createWorkSpace}>
        <FontAwesomeIcon style={{color: 'rgba(5,191,218,0.67)', fontSize: '10px'}} className='icon' icon={faS}/>
        <input style={{
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none',
            borderBottom: '1px solid #aaa',
            width: '100%',
            padding: '3px',
            caretColor: '#aaa',
            color: '#aaa'
        }} autoFocus={true}
               onChange={e => setName(e.target.value)}
               type="text"
               placeholder="new workSpace"/>
    </form>
}
