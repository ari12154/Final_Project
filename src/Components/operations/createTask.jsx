import React, {useEffect, useState} from 'react';
import useAxios from "../customHooks/useAxios";
import Input from "../elements/input";

export default function CreateTask({setCreateTask, space, listStatus}) {

    const [taskName, setTaskName]= useState('')
    const newLists = space.lists.slice()
    const [task, setTask] = useState({})
    const {request} = useAxios()

    useEffect(() => {
        setTask({
            date: new Date(Date.now()).toLocaleDateString(),
            taskName: taskName,
            complete: false
        })
    }, [taskName])


    const createTask = (e) => {
        e.preventDefault()
        for (let i = 0; i < space.lists.length; i++) {
            if (space.lists[i].status === listStatus) {
                newLists[i] = {...newLists[i], tasks: [...newLists[i].tasks, task]}
            }
        }
        console.log(newLists)
        if (taskName) {
            request('EDIT', `http://localhost:3001/${space._id}`, {...space, lists: newLists})
        }
        setCreateTask(createTask => !createTask)
    }

    return (
        <form onSubmit={createTask}
              style={{
                  border: '1px solid rgba(5,191,218,0.67)',
                  borderRadius: '8px',
                  height: '3.5rem',
                  maxWidth: '12rem',
                  padding: '.5rem',
              }}>
            <Input setName={setTaskName}/>
            <button
                style={{
                    marginTop: '1rem',
                    float: 'right',
                    border: 'none',
                    backgroundColor: 'rgba(5,191,218,0.67)',
                    color: 'rgba(0,0,0,.5)',
                    borderRadius: '5px',
                    padding: '.2rem'
                }}
                type="submit">Save
            </button>
        </form>
    );
}