import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import useAxios from "../customHooks/useAxios";
import CreateTask from "./createTask";
import ShowTasks from "./showTasks";
import ColorPicker from "../custom/colorPicker";
import Input from "../elements/input";
import ListNavigation from "../elements/listNavigation";

function ShowLists({list, space}) {

    const listStatus = list.status
    const newLists = space.lists.slice()
    const [navOpen, setNavOpen] = useState(false)
    const [createTask, setCreateTask] = useState(false)
    const [edit, setEdit] = useState(false)
    const [newStatus, setNewStatus] = useState('')
    const [editColor, setEditColor] = useState(false)
    const [colorValue, setColorValue] = useState('#fff')
    const {request} = useAxios()

    const renameList = (e) => {
        e.preventDefault()
        for (let i = 0; i < space.lists.length; i++) {
            if (list._id === space.lists[i]._id && newStatus) {
                newLists[i] = {...newLists[i], status: newStatus}
                console.log(newLists[i])
            }
        }
        request('EDIT', `http://localhost:3001/${space._id}`,
            {
                ...space.lists, lists: newLists
            })
        setEdit(!edit)
    }

    return (
        <div>
            <div style={{
                marginTop: '3rem',
                marginRight: '.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                width: 'calc(600px / 2.2)',
                borderTop: colorValue !== '#fff' ? `3px solid ${colorValue}` : '3px solid silver',
                height: '2rem',
                maxHeight: '2rem',
                borderRadius: '3px',
                padding: '10px 5px 0 5px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0 2px 8px 0',
            }}>

                {!edit
                    ? <span>{list.status}</span>
                    : <form onSubmit={renameList}>
                        <Input setName={setNewStatus}/>
                    </form>}

                <div style={{width: '2rem', zIndex: '1', overflow: 'revert', position: 'relative'}}>
                    <FontAwesomeIcon onClick={() => setNavOpen(!navOpen)} icon={faEllipsis}/>
                    {navOpen
                        ? <ListNavigation space={space} list={list} setCreateTask={setCreateTask} setEdit={setEdit}
                                          setEditColor={setEditColor} setNavOpen={setNavOpen}/>
                        : null}
                    {editColor
                        ? <div style={{
                            width: '10rem',
                            marginTop: '.9rem',
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0 2px 8px 0',
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            position: 'absolute',
                            right: '-15%',
                            top: '60%'
                        }}>
                            <ColorPicker colorValue={setColorValue}/>
                            <button onClick={() => setEditColor(!editColor)} style={{width: '100%'}}>submit</button>
                        </div> : null}
                </div>
            </div>
            <div style={{
                maxHeight: '65vh',
                marginTop: '1rem',
                width: 'calc(600px / 2.1)',
                overflow: 'auto',
                overflowX: 'hidden',
                overflowY: '-moz-hidden-unscrollable'
            }}>
                {list.tasks.map(task => {
                    return <ShowTasks key={task._id} task={task} space={space} list={list}/>
                })}

                {!createTask
                    ? <button
                        style={{
                            background: 'none',
                            margin: '.5rem 0 0 .2rem',
                            border: 'none',
                            color: 'rgba(0,0,0,.2)'
                        }}
                        onClick={() => setCreateTask(!createTask)}>NEW TASK
                    </button>
                    : space.lists.map(list => {
                        return listStatus === list.status
                            ? <CreateTask key={list._id} listStatus={listStatus} setCreateTask={setCreateTask}
                                          space={space}
                                          list={list}/>
                            : null
                    })}
            </div>
        </div>
    );
}

export default ShowLists;