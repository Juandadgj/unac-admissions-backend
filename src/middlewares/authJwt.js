import jwt from "jsonwebtoken";
import User from "../model/User";
import Role from "../model/Role";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) throw new Error('Token required!');
        const decoded = jwt.verify(token, process.env.SECRET);
        req.id = decoded.id;
        const user = await User.findById(req.id);
        if (!user) res.status(400).json({message: "User not found"});
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

export const itsAuthorized = async (roleRequired, user_id) => {
    try {
        console.log(user_id);
        const user = await User.findById(user_id);
        const roles = await Role.find({_id: {$in: user.roles}});
        console.log(roles);
        let itsAuthorized = false;
        for (let x=0; x<roles.length; x++) {
            if (roles[x].name === roleRequired) itsAuthorized = true;
        }
        return itsAuthorized;
    } catch (error) {
        console.log(error);
    }
}
