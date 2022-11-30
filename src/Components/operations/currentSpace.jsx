import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSave, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import useAxios from "../customHooks/useAxios";
import Input from "../elements/input";


export default function CurrentSpace({space, setSpaceName}) {

    const [name, setName] = useState('')
    const [newData, setNewData] = useState(space)
    const [edit, setEdit] = useState(false)
    const {request} = useAxios()


    useEffect(() => {
        setNewData({...space, name: name})
    },[name])

    const deleteWorkSpace = () => {
        request('DELETE', `http://localhost:3001/${space._id}`)
    }
    const editWorkSpace = (e) => {
        e.preventDefault()
        if (name) {
            request('EDIT', `http://localhost:3001/${space._id}`, newData)
            setSpaceName(name)
        }
        setEdit(!edit)
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1rem 0 1rem',
        }}>
            {!edit
                ? <span>{space.name}</span>
                : <form style={{display: 'flex', alignItems: 'center', gap: '1rem'}} onSubmit={editWorkSpace}>
                    <Input setName={setName}/>
                </form>}

            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                {!edit
                    ? <FontAwesomeIcon onClick={() => setEdit(!edit)} icon={faEdit}/>
                    : <FontAwesomeIcon onClick={editWorkSpace} icon={faSave}/>
                }
                <FontAwesomeIcon onClick={deleteWorkSpace} icon={faTrashCan}/>
            </div>
        </div>
    );
}