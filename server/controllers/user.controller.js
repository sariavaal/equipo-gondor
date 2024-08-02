const User = require('../models/User.model');
const {hashPassword, comparePassword} = require('../utils/hash');
const jwt = require('jsonwebtoken');
const validatePassword = require('../utils/validatePassword');
const bcrypt = require('bcrypt');
module.exports = {
    createUser: async (req, res) => {
        const { name, email, password, confirmPassword } = req.body;
        try{
            validatePassword(password, confirmPassword);
            const hashedPassword = await hashPassword(password);
            const user = new User({
                name,
                email,
                password: hashedPassword
            });
            await user.save();
            res.json({message: 'User created successfully'});
        }catch(err){
            res.status(500).json({message: err.message});
        }
    },
    loginUser: (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }
                return bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(401).json({ message: 'Invalid email or password' });
                        }
                        const userInfo = {
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        };
                        console.log("userInfo: ", userInfo);
                        const secret = process.env.JWT_SECRET;
                        const newJwt = jwt.sign(userInfo, secret, { expiresIn: '1d' });
                        console.log("newJwt: ", newJwt);
                        res
                            .status(200)
                            .cookie('token', newJwt, {
                                httpOnly: true,
                                maxAge: 24 * 60 * 60 * 1000
                            });
                        res.json({ 
                            message: 'User logged in successfully',
                            user: userInfo // Añade los datos del usuario aquí
                        });
                    })
                    .catch(err => {
                        res.status(500).json({ message: err.message });
                    });
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    }
}    

