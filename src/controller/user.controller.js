import User from '../model/User';
import Role from '../model/Role';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { itsAuthorized } from '../middlewares/authJwt';

export const signup = async (req, res) => {
    try {
        const authorization = await itsAuthorized('Administrator', req.id);
        if (!authorization) throw new Error('You are not authorized :(');
        console.log(`Authorized: ${authorization}`);
        const user = new User(req.body);
        const { password } = user;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        const role = await Role.findOne({name: 'Student'});
        user.roles = [role._id];
        const userSaved = await user.save();
        const token = jwt.sign({id: userSaved._id}, process.env.SECRET, {expiresIn: 86400});
        res.status(200).json({token: token, user: userSaved});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

export const signin = async (req, res) => {
    try {
        const {mail, password} = req.body;
        if (!mail || !password) throw new Error('Fields required!');
        const user = await User.findOne({mail: mail}).populate('roles');
        if (!user) throw new Error('User not found :(');
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: 86400});
            res.status(202).json({token: token, user: user});
        } else {
            res.status(401).json({token: null, message: "Invalid password :("});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({token: null, message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const user = await User.findByIdAndUpdate({_id: id}, req.body);
        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOneAndDelete({_id: id});
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}
