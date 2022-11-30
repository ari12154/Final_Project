import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";

export default function Input({setName}) {
    return (
        <div style={{
            display: "flex",
            alignItems: 'center',
            gap: '.3rem'
        }}>
            <FontAwesomeIcon style={{width: "8px"}} icon={faX} onClick={() => setName('')}/>
            <input style={{border: 'none', outline: 'none', height: '1rem', backgroundColor: 'transparent'}}
                   placeholder="Rename"
                   type="text"
                   aria-multiline="true"
                   autoFocus={true}
                   onChange={e => setName(e.target.value)}/>
        </div>
    );
}
