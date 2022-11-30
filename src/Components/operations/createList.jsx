import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import useAxios from "../customHooks/useAxios";
import ShowLists from "./showLists";
import Input from "../elements/input";

function CreateList({space}) {

    const [status, setStatus] = useState('')
    const [list, setList] = useState({})
    const [active, setActive] = useState(false)
    const {request} = useAxios()

    useEffect(() => {
        setList({
            id: Date.now(),
            status: status,
            tasks: []
        })
    }, [status])


    const createList = (e) => {
        e.preventDefault()
        if (status && status.match(/^([a-zA-Z]+)/)) {
            request('EDIT', `http://localhost:3001/${space._id}`,
                {...space, lists: [...space.lists, list]})
        }
        setStatus('')
        setActive(!active)
    }

    return (
        <>
            <div style={{
                textAlign: 'center',
                margin: '.5rem 0 0 .3rem',
                display: 'flex',
                gap: 2,
                position: 'absolute',
                right: '3%',
                top: '90%',
            }}>
                {active
                    ? <form onSubmit={createList} style={{
                        display: 'flex',
                        gap: 2,
                        borderRadius: 90,
                        backgroundColor: 'rgba(5,191,218,0.67)',
                        padding: '7px',
                        textAlign: 'center',
                    }}>
                        <Input setName={setStatus}/>
                        <FontAwesomeIcon onClick={() => setActive(!active)} icon={faAdd}/>
                    </form>

                    : <FontAwesomeIcon style={{
                        borderRadius: 90,
                        backgroundColor: 'rgba(5,191,218,0.67)',
                        width: '1rem',
                        padding: '7px',
                    }} onClick={() => setActive(!active)} icon={faAdd}/>}
            </div>

            <div style={{display: 'flex', marginTop: '1rem', marginLeft: '.6rem'}}>
                {space.lists.map(list => {
                    return (
                        <ShowLists key={list._id} space={space} list={list}/>
                    )
                })}
            </div>
        </>
    );
}

export default CreateList;