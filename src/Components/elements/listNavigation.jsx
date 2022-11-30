import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faEdit, faEyeDropper, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import useAxios from "../customHooks/useAxios";

export default function ListNavigation({setNavOpen, setEdit, setEditColor, setCreateTask, space, list}) {

    const {request} = useAxios()

    const deleteList = () => {
        request('EDIT', `http://localhost:3001/${space._id}`,
            {...space.lists, lists: space.lists.filter(space => space._id !== list._id)})
        setNavOpen(false)
    }

    return (
        <div style={{
            width: '10rem',
            marginTop: '.9rem',
            padding: '5px 2rem 5px 0',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0 2px 8px 0',
            backgroundColor: '#fff',
            borderRadius: '6px',
            position: 'absolute',
            right: '-15%',
            top: '60%'
        }}>
            <ul style={{
                listStyle: "none",
                paddingLeft: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                color: 'rgba(0,0,0,.5)'
            }}>
                <li style={{cursor: 'pointer'}} onClick={() => {
                    setEdit(edit => !edit)
                    setNavOpen(false)
                }}>
                    <FontAwesomeIcon style={{paddingRight: '.5rem', color: '#aaa'}}
                                     icon={faEdit}/> Rename
                </li>
                <li style={{cursor: 'pointer'}} onClick={deleteList}>
                    <FontAwesomeIcon style={{paddingRight: '.5rem', color: '#f00'}}
                                     icon={faTrashCan}/> Delete
                </li>

                <li style={{cursor: 'pointer'}} onClick={() => {
                    setNavOpen(navOpen => !navOpen)
                    setEditColor(editColor => !editColor)
                }}>
                    <FontAwesomeIcon style={{paddingRight: '.5rem', color: '#333'}}
                                     icon={faEyeDropper}/> Edit color
                </li>
                <li style={{cursor: 'pointer'}} onClick={() => {
                    setCreateTask(createTask => !createTask);
                    setNavOpen(false)
                }}>
                    <FontAwesomeIcon
                        style={{paddingRight: '.5rem', color: '#00f'}}
                        icon={faAdd}/> Add New Task
                </li>
            </ul>
        </div>
    );
}