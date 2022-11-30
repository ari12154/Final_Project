import React from 'react';

function ThisWeekTasks({spaces}) {
    return (
        <div className='taskOfThisWeek'>
            <div className='title'><span>This Week Tasks</span></div>
            {spaces.map(space =>
                space.lists.map(list =>
                    list.tasks.map((task, index) => {
                            return new Date(task.date).getDate() >= (new Date(Date.now()).getDate() - 7)
                                ? <div key={index} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderRadius: '6px',
                                    boxShadow: 'rgba(0, 0, 0, 0.16) 0 1px 4px',
                                    padding: '5px',
                                    maxWidth: '85%',
                                    marginLeft: '1.1rem'
                                }}>
                                    <div style={{display: 'flex', gap: '2.5rem', alignItems: 'center'}}>
                                        <div style={{
                                            width: '5px',
                                            height: '5px',
                                            backgroundColor: !task.complete ? '#ff0000' : '#05c505'
                                        }}/>
                                        <span>{task.taskName}</span>
                                    </div>
                                    <span style={{
                                        backgroundColor: !task.complete ? '#fdcece' : '#d7fdd7',
                                        border: !task.complete ? '1px solid #fdcece' : '1px solid #d7fdd7',
                                        padding: '3px 18px',
                                        borderRadius: '6px',
                                        fontSize: 'small'
                                    }}>
                                            {task.complete ? 'Done' : 'Todo'}
                                        </span>
                                </div>
                                : null
                        }
                    )
                )
            )}
        </div>
    );
}

export default ThisWeekTasks;