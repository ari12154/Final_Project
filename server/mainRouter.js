const express = require('express')
const {workSpaceModel} = require("../db/models/workSpaceModel");
// const nodemailer = require("nodemailer");
const router = express.Router()


// const send_Mail = () => {
//
//     return new Promise((resolve, reject) => {
//         const Transport = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'befit208@gmail.com',
//                 pass: 'qvmxcgiwwpxlgqkz',
//             }
//         })
//
//
//         const emailOptions = {
//             from: 'befit208@gmail.com',
//             to: 'usastock208@gmail.com',
//             subject: 'Message from yoad',
//             text: [1,'\n',2,'\n', 3,'\n',4,'\n',5].toString()
//         }
//
//
//         Transport.sendMail(emailOptions, (err, info) => {
//             if (err) {
//                 console.log(err)
//                 return reject({message: 'an error has accorded'})
//             } else {
//                 console.log('message sent successfuly..')
//                 resolve({message: 'message sent successfuly..'})
//             }
//         })
//     })
// }
//
// send_Mail()

router.get('/', async (req, res, next) => {
    const spaces = await workSpaceModel.find({})
    console.log(req.headers.cookie)
    res.json({spaces})
})

router.post('/', async (req, res, next) => {
    console.log(req.body)
    let workSpace = new workSpaceModel(req.body);
    await workSpace.save();
    res.json(workSpace)
})
router.delete('/:id/:user', async (req, res, next) => {
    try {
        let data = await workSpaceModel.deleteOne({_id: req.params.id, user: req.params.user})
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

router.put('/:id', async (req, res, next) => {
    let dataSaved = req.body
    try {
        let data = await workSpaceModel.updateOne({_id: req.params.id}, dataSaved)
        console.log(data)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

module.exports = router