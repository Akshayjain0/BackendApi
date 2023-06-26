const { ErrorHandler } = require("../middlewares/error");
const Task = require("../models/taskModel");

const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user
        })
        res.status(201).json({
            success: true,
            message: "Task Added Successfully"
        })
    } catch (error) {
        next(error)
    }
}

const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id;
        const task = await Task.find({ user: userid })

        res.status(200).json({
            success: true,
            task,
        })
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    try {

        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return next(new ErrorHandler("Task Not Found", 404))
        }
        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated"
        })
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
try {
    
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
        return next(new ErrorHandler("Task Not Found", 404))
    }
    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Successfully deleted"
    })
} catch (error) {
    next(error)
}
}

module.exports = { newTask, getMyTask, updateTask, deleteTask }