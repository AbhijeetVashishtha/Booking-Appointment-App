const User = require('../models/user');

exports.addUser = async(req,res,next) => {
   try{
    if(!req.body.number)
    {
        throw new Error('Phone Number is Mandatory');
    }

    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.number;

    const data = await User.create({name: name, email: email, phonenumber: phonenumber});
    res.status(200).json({newUserDetail: data});
    }
    catch(err) 
    {
        res.status(500).json({
            error: err
        });
    }    
};

exports.getUser = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ allUsers: users })
    } catch (error) {
        console.log('Get user is failing', JSON.stringify(error));
        res.status(500).json({ error: error })
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        if (!req.params.id) {
            console.log('Id is missing');
            return res.status(400).json({ err: 'Id is missing' })
        }
        const uId = req.params.id;
        await User.destroy({ where: { id: uId } });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
};

exports.editUser = async(req,res,next) => {
    try{
        if(!req.params.id)
        {
            console.log('Id is Missing');
            return res.status(500).json({err: 'Id is Missing'});
        }
        const uId = req.params.id;
        await User.build({where: {id: uId}});
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};