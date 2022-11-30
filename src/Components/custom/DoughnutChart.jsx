import React, {useEffect, useState} from 'react';
import {Doughnut} from "react-chartjs-2";
import 'chart.js/auto'

export default function DataChart({spaces}) {
    const [space, countSpace] = useState(0)
    const [lists, countLists] = useState(0)
    const [tasks, countTasks] = useState(0)

    useEffect(() => {
        getData()
    }, [spaces])


    const getData = () => {
        countSpace(0)
        countLists(0)
        countTasks(0)
        let spacesObj = Object.keys(spaces)

        countSpace(space => space + spaces.length)
        spacesObj.forEach(obj => {
            countLists(lists => lists + spaces[obj].lists.length)
            spaces[obj].lists.forEach(list => {
                    countTasks(tasks => tasks + list.tasks.length)
                }
            )
        })
    }

    return (
        <div style={{
            borderRadius: '6px',
            width: '100%',
            maxWidth: '48%',
            maxHeight: '48%',
            marginTop: '.2rem',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0 1px 4px',
        }}>
            <Doughnut data={{
                labels: ['spaces', 'lists', 'tasks'],
                datasets: [{
                    data: [space, lists, tasks],
                    backgroundColor: ['rgba(155,155,253,0.99)', 'rgba(155,253,201,0.99)', 'rgba(253,155,155,0.99)'],
                }]
            }} height={400} width={440}  type={'doughnut'}
                      options={{maintainAspectRatio: false}}/>
        </div>
    )
}