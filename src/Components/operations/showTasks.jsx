import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import useAxios from "../customHooks/useAxios";
import Input from "../elements/input";

export default function ShowTasks({space, task, list}) {

    let newTasks
    const newLists = space.lists.slice()
    const [newTaskName, setNewTaskName] = useState('')
    const [editTask, setEditTask] = useState(false)
    const [check, setCheck] = useState(null)
    const {request} = useAxios()



    const deleteTask = () => {
        for (let i = 0; i < space.lists.length; i++) {
            if (newLists[i]._id === list._id) {
                newLists[i] = {
                    ...newLists[i],
                    tasks: newLists[i].tasks.filter(currentTask => currentTask._id !== task._id)
                }
            }
        }
        request('EDIT', `http://localhost:3001/${space._id}`,
            {
                ...space.lists, lists: newLists
            })
    }
    const completeTask = () => {
        let i = 0;
        let j = 0;
        while (i < space.lists.length) {
            if (newLists[i]._id === list._id) {
                newTasks = newLists[i].tasks.slice()
                console.log(newTasks)
                break
            }
            i++
        }
        while (j < newTasks.length) {
            if (newTasks[j]._id === task._id) {
                newTasks[j] = {...newTasks[j], complete: check}
                newLists[i] = {...newLists[i], tasks: newTasks}
                break
            }
            j++
        }
        request('EDIT', `http://localhost:3001/${space._id}`,
            {
                ...space.lists, lists: newLists
            })
    }

    const renameTask = () => {
        let i = 0;
        let j = 0
        if (newTaskName) {
            while (i < space.lists.length) {
                if (newLists[i]._id === list._id) {
                    newTasks = newLists[i].tasks.slice()
                    console.log(newTasks)
                    break
                }
                i++
            }
            while (j < newTasks.length) {
                if (newTasks[j]._id === task._id) {
                    newTasks[j] = {...newTasks[j], taskName: newTaskName, complete: check}
                    newLists[i] = {...newLists[i], tasks: newTasks}
                    break
                }
                j++
            }
            request('EDIT', `http://localhost:3001/${space._id}`,
                {
                    ...space.lists, lists: newLists
                })
        }
        setEditTask(!editTask)
    }

    return (
        <div style={{position: 'relative'}}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '.5rem',
                backgroundColor: task.complete ? '#e7fde7' : '#fcdfdf',
                boxShadow: 'rgba(0, 0, 0, 0.16) 0 1px 4px',
                maxWidth: 'calc(600px / 2.2)',
                margin: '0 0 .5rem 0',
                padding: '10px 5px 0 5px',
                borderRadius: '3px',
                wordBreak: 'break-word',
                minHeight: '6rem'
            }}>
                <div
                    style={{display: 'flex', flexDirection: 'column', gap: '.8rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 .2rem'}}>
                        <span style={{fontSize: 'small', color: '#aaa',}}>{space.name}</span>
                        <span>{task.date}</span>
                    </div>
                    {!editTask
                        ? <span>{task.taskName}</span>
                        : <form onSubmit={renameTask}><Input setName={setNewTaskName}/></form>}
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '1.5rem 0 .5rem 0',
                }}>

                    <FontAwesomeIcon style={{color: task.complete ? '#01a401' : '#f00', cursor: 'pointer'}}
                                     onClick={() => {
                                         setCheck(!check)
                                         completeTask()
                                     }} icon={faCheck}/>
                    <div style={{display: 'flex', justifyContent: 'right', gap: '.5rem'}}>
                        <FontAwesomeIcon onClick={() => setEditTask(!editTask)} icon={faEdit}/>
                        <FontAwesomeIcon onClick={deleteTask} icon={faTrashCan}/>
                    </div>
                </div>
            </div>
        </div>
    );
}