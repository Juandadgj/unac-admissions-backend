import Process from '../model/Process';

export const allProcess = async (req, res) => {
    try {
        const processes = await Process.find({}, { title: 1 });
        res.status(200).send(processes);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const processByID = async (req, res) => {
    try {
        const { id } = req.params;
        const process = await Process.findById(id);
        res.status(200).send(process);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}
