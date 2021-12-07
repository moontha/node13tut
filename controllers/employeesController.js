const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.sendStatus(204).json({ "message": "No employee found!" });
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.sendStatus(400).json({ "message": " firstname and lastname are required!" });
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
        return res.json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateEmployee = async (req, res) => {
    if(!req?.body?.id){
        return res.sendStatus(400).json({'message': 'ID is required'});
    }

    const employee = await Employee.findOne({__id : req.body.id}).exec();
    
    if (!employee) {
        return res.sendStatus(400).json({ "message": `Employee ID match ${req.body.id}` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;

    const result = await employee.save();
    return res.json(result);
  
}

const deleteEmployee = async (req, res) => {
    if(!req?.body?.id){
        return res.sendStatus(400).json({'message': 'ID is required'});
    }

    const employee = await Employee.findOne({__id : req.body.id}).exec();
   
    if (!employee) {
        return res.sendStatus(400).json({ "message": `Employee ID match ${req.body.id}` });
    }
   const result = await employee.deleteOne({__id : req.body.id});
   return res.json(result);
}

const getEmployee = async (req, res) => {
    if(!req?.params?.id){
        return res.sendStatus(400).json({'message': 'supply ID parame.'});
    }
    const employee = await Employee.findOne({__id : req.params.id}).exec();
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}