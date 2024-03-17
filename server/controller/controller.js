var Userdb = require('../model/model');

// create and save new user
// exports.create = (req,res)=>{
//     // validate request
//     if(!req.body){
//         res.status(400).send({ message : "Content can not be emtpy!"});
//         return;
//     }

//     // new user
//     const user = new Userdb({
//         firstname : req.body.firstname,
//         lastname : req.body.lastname,
//         email : req.body.email,
//         phone : req.body.phone,
//     })

//     // save user in the database
//     user
//         .save(user)
//         .then(data => {
//             //res.send(data)
//             res.redirect('/add-user');
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message : err.message || "Some error occurred while creating a create operation"
//             });
//         });

// }

exports.create  = async (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            return res.status(400).send({ message: "Content can not be empty!" });
        }

        // Check if an employee with the same email already exists
        const existingEmployee = await Userdb.findOne({ email: req.body.email });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Employee with the same email already exists' });
        }

        // Create a new employee
        const employeeCreated = new Userdb({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
        });

        // Save the employee in the database
        await employeeCreated.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message || "Some error occurred while creating a create operation");
    }
};


exports.find = async (req, res) => {
    try {
        if (req.query.id) {
            const id = req.query.id;
            const employeeById = await Userdb.findById(id);

            if (!employeeById) {
                return res.status(404).send({ message: "Not found user with id " + id });
            }

            return res.send(employeeById);
        } else {
            const allEmployees = await Userdb.find();
            res.send(allEmployees);
        }
    } catch (err) {
        res.status(500).send({ message: err.message || "Error occurred while retrieving user information" });
    }
};

exports.update = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: "Data to update can not be empty" });
        }

        const id = req.params.id;
        const employeeUpdate = await Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

        if (!employeeUpdate) {
            return res.status(404).send({ message: `Cannot update user with ID ${id}. User not found!` });
        }

        res.send(employeeUpdate);
    } catch (error) {
        res.status(500).send({ message: "Error updating user information" });
    }
};


// Delete a user with specified user id in the request
exports.delete = async (req, res) => {
    try {
        const deletedEmployee = await Userdb.findByIdAndDelete(req.params.id);
        if (deletedEmployee) {
            res.status(200).json({ message: "Employee is deleted" });
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// BLock/Unblock User
exports.block = async (req, res) => {
    try {
        const existingEmployee = await Userdb.findById(req.params.id);
        if (existingEmployee) {
            existingEmployee.block = !existingEmployee.block;
            await existingEmployee.save();
            res.status(200).json(existingEmployee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to block/unblock employee' });
    }
};