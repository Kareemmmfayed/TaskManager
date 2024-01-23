const Task = require("../models/tasks");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(201).json({ tasks });
    } catch (error) {
        res.status(500).json({ msg: error });
        
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const getTask = async (req, res) => {
    try {
        const {id : taskID} = req.params;
        const task = await Task.findOne({_id : taskID});
        if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const updateTasks = async (req, res) => {
    try {
        const {id : taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id : taskID}, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }
        res.status(200).json({id : taskID, data : req.body});
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteTasks = async (req, res) => {
    try {
        const {id : taskID} = req.params;
        const task = await Task.findOneAndDelete({_id : taskID});
        if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }
        res.status(201).send();
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTasks,
    deleteTasks
}