var router = require('express').Router()
var contactController = require('./contactController') 

router.get('/login', (req , res) =>{
    res.render('login' , {
        // console.log("This is login page")
        status : 'API its Working',
        message : 'Welcome TO my page~'
    })
    
})

router.get('/register' ,(req,res) => {
    res.render('register' ,{
        status : 'API Its Working',
        message : 'Welcome to resthub'
    })
})

router.route('/login')
    .post(contactController.login)

router.route('/register')
    .post(contactController.register)

router.route('/get')
    .get(contactController.getnow)

router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new)

router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .delete(contactController.delete)

    
module.exports = router