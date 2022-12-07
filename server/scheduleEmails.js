const nodemailer = require("nodemailer");
const axios = require('axios')

let unCompleteTasks = []
let template = ""
const getUnCompletedTasks = async () => {
    const {data} = await axios.get(`http://localhost:3001/`)
    data.spaces.forEach(space => {
        space.lists.forEach(list => {
            list.tasks.forEach(task => {
                if (!task.complete) {
                    unCompleteTasks.push(task.taskName)
                }
            })
        })
    })
    unCompleteTasks.forEach((taskName, i) => {
        template += `<h1>Task_${i + 1} -> <span style="color: #d10000">${taskName}</span></h1> <br/>`
    })
    await send_Mail()
}


exports.getUsers = async () => {
    const {data} = await axios.get('http://localhost:3001/users')
    data.users.forEach(user => {
        if (user.notification) {
            getUnCompletedTasks()
            unCompleteTasks = []
        }
    })
}


const send_Mail = () => {

    return new Promise((resolve, reject) => {
        const Transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'befit208@gmail.com',
                pass: 'qvmxcgiwwpxlgqkz',
            }
        })


        const emailOptions = {
            from: 'befit208@gmail.com',
            to: 'usastock208@gmail.com',
            subject: 'Message from yoad',
            html: `<p>hello friend!</p>
                  <p>We are find that you have an <b style="color: #d10000">${unCompleteTasks.length}</b> uncompleted Tasks</p>
                  <h2>${template}</h2>`
        }


        Transport.sendMail(emailOptions, (err, info) => {
            if (err) {
                console.log(err)
                return reject({message: 'an error has accorded'})
            } else {
                console.log('message sent successfuly..')
                resolve({message: 'message sent successfuly..'})
            }
        })
    })
}
