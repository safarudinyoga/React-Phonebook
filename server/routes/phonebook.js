var express = require('express');
var router = express.Router();
var Todo = require('../models/phonebook')

/* GET users listing. */
// adding sort todo in backend
router.get('/', (req, res, next) => {
    Todo.aggregate().collation({ locale: 'id' }).sort({ name: 'asc' }).exec().then(data => {
        res.json({
            status: 'Success',
            error: false,
            data
        })
    }).catch(err => {
        res.json({
            status: 'Failed',
            error: true,
            message: err
        })
    })
})    

/* POST ADD USER. */
router.post('/', (req, res, next) => {
    // { id: req.body.id, name: req.body.name, message: req.body.message }
    Todo.create(req.body)
        .then(data => {
            res.json({
                status: 'Success',
                error: false,
                itemAdded: data
            })
        }).catch(err => {
            res.json({
                status: 'Failed',
                error: true,
                message: err
            })
        })
})

/* GET USER DELETE. */
router.delete('/:id', (req, res, next) => {
    let id = req.params.id
    Todo.findOneAndRemove({ id }).then(data => {
        res.json({
            status: 'Success',
            error: false,
            itemDeleted: data
        })
    }).catch(err => {
        res.json({
            status: 'Failed',
            error: true,
            message: err
        })
    })
})

/* GET USER EDIT. */
router.put('/:id', (req, res, next) => {
    let id = req.params.id
    let { name, phonenumber } = req.body
    // ...(name && { name }) => jika name dikanan bernilai truthy(diisi nilai) (&&dieksekusi), jika nama bernilai falsy (0, undefined, null, NaN, '', false)
    Todo.findOneAndUpdate({ id }, { ...(name && { name }), ...(phonenumber && { phonenumber }) }, { new: true }).then(data => {
        res.json({
            status: 'Success',
            error: false,
            data
        })
    }).catch(err => {
        res.json({
            status: 'Failed',
            error: true,
            message: err
        })
    })
})

/* GET USER FILTER. */
// router.post('/search', (req, res, next) => {
//     let filter = {};
//     req.body.name ? filter.name = req.body.name : '';
//     req.body.phonenumber ? filter.phonenumber = req.body.phonenumber : '';
//     PhoneBook.find(filter)
//     .then(data => {
//         res.json({
//             status: 'Success',
//             error: false,
//             data
//         })
//     }).catch(err => {
//         res.json({
//             status: 'Failed',
//             error: true,
//             message: err
//         })
//     })
// })


module.exports = router;
