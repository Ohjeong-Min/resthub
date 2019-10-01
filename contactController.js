var Contact = require('./contactModel')
const Bcrypt = require('bcryptjs')

exports.new = (req, res) =>{
   var contact = new Contact();
   contact.name = req.body.name ? req.body.name : contact.name
   contact.email =req.body.email
   contact.password =req.body.password
   contact.gender =req.body.gender
   contact.phone =req.body.phone
   contact.save((err)=>{
       if(err){
           res.json(err)
       }
       else{
           res.json({
               message : "New contact created",
               data: contact
           })
       }
   })
}
exports.index = (req,res) =>{
   Contact.get((err , contacts)=>{
       if(err){
           res.json({
               status:"error",
               message : err
           })
       }
       else{
           res.json({
               status:"Success",
               message : " Contacts  received Successfully",
               data: contacts
           })
       }
   })
}
exports.view = (req , res)=>{
   Contact.findById(req.params.contact_id , (err,contact )=>{
       if(err){
           res.send(err)
       }
       else{
           res.json({
               message: "Contact details loading",
               data : contact
           })
       }
   })
}

exports.update = (req,res)=>{
    Contact.findById(req.params.name , (err , contact)=>{
        if(err){
            res.send(err)
        }
        else{
            contact.name = req.body.name ? req.body.name : contact.name
            contact.email = req.body.email 
            contact.password = req.body.password
            contact.gender = req.body.gender
            contact.phone = req.body.phone

            contact.save((err)=>{
                if(err) {
                    res.json(err)
                }
                else{
                    res.json({
                        message : 'Contact info Update',
                        data : contact
                    })
                }
            })
        }
    })
}

exports.delete = (req , res) =>{
    Contact.remove({
        _id : req.password.contact_id
    }, (err, contact)=>{
        if(err) {
            res.send(err)
        }
        else{
            res.json({
                status : "success",
                message : "completed delete"
            })
        }
    }
    )
}

exports.getnow = (req,res)=>{
    var fetch = require('node-fatch')
    fetch('http://localhost:3000/api/contacts')
    .then(res => res.json())
    .then(resData => console.log(resData))
}

exports.register = (req , res) =>{
    var contact = new Contact();
    var inputPassword = req.body.passwords;

    contact.name = req.body.name ? req.body.name : contact.name
    contact.email = req.body.email
    contact.password = Bcrypt.hashSync(inputPassword)
    contact.gender = req.body.gender
    contact.phone = req.body.phone

    //save the contact and check errors
    contact.save((err)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json({
                message : '환영합니다.' ,
                data : contact
            })
        }
    })
}

exports.login = async (req , res)=>{
    var inputEmail = req.body.id 
    if(inputEmail){
        var user = await Contact.findOne({email:inputEmail}).exec()
        console.log(user)

        try{
            if(!user){
                return res.status(400).send({message:"The username does not exit"})
            }
            else{
                console.log(Bcrypt.compareSync(req.body.passwords,user.password))
                if(!Bcrypt.compareSync(req.body.passwords,user.password)){
                    return res.status(400).send({message:"The password is invalid"})
                }
                else{
                    return res.send({message : "Welcome To My Homepage"})
                }
            }
        }
        catch(err){
            res.status(500).send(err)
        }
    }
    else{
        res.json({
            message : "Username is empty!"
        })
        console.log("email ID is need  ! ")
    }
}