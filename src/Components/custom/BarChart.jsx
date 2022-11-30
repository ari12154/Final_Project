import React, {useEffect, useState} from 'react';
import {Bar} from "react-chartjs-2";
import 'chart.js/auto'

export default function BarChart({spaces}) {
    const [complete, countComplete] = useState(0)
    const [todo, countTodo] = useState(0)

    useEffect(() => {
        getData()
    }, [spaces])


    const getData = () => {
        countComplete(0)
        countTodo(0)

        spaces.forEach(space =>
            space.lists.forEach(list =>
                list.tasks.forEach(task => {
                    if (task.complete) {
                        countComplete(complete => complete + 1)
                    } else {
                        countTodo(todo => todo + 1)
                    }
                })
            )
        )
    }

    return (
        <div className='barChart'>
            <Bar data={{
                labels: ['Complete', 'Todo'],
                datasets: [{
                    label: 'Completed / todos',
                    data: [complete, todo],
                    backgroundColor: ['rgba(155,253,201,0.99)', 'rgba(253,155,155,0.99)'],
                }]
            }} height={400} width={440} type={'bar'}
                      options={{maintainAspectRatio: false}}/>
        </div>
    )
}