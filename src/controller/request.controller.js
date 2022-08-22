import Request from "../model/Request";
import User from "../model/User";
import Process from "../model/Process";

export const allRequest = async (req, res) => {
    try {
        const requests = await Request.find().populate('user').populate('process');
        res.status(200).send(requests);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const createRequest = async (req, res) => {
    try {
        const { user, process } = req.body;
        const existUser = User.findById(user);
        const existProcess = Process.findById(process);
        if (!existUser) throw new Error('User not found :(');
        if (!existProcess) throw new Error('Process not found :(');
        req.body.signature_coordinator = false;
        const request = Request(req.body);
        const requestSaved = await request.save();
        res.status(200).json(requestSaved);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const approveRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findByIdAndUpdate({_id: id}, {'signature_coordinator': true});
        res.status(201).send(request);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
