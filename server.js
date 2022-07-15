const express = require('express');
const mongoose = require('mongoose');
const port = 5000;
const Student = require('./models/student');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.get('/students', async(req, res) => {
    try {
        await Student.find({}).then(result => {
            res.send(result);
        });
    } catch (err) {
        console.log(err);
    }
});

// add  student
app.post('/add', async(req, res) => {
    try {
        let new_student = new Student({
            cin: req.body.cin,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
        });
        await new_student.save();
        res.send('added with succes!');

    } catch (err) {
        console.log(err);
    }
});

// delete student
app.delete('/delete/:id', async(req, res) => {
    try {
        await Student.findOneAndDelete({ id: req.params.id })
        res.send('delete with success!')
    } catch (err) {
        res.send(err);
    }
});

// update student
app.put('/update/:id', async(req, res) => {
    try {
        await Student.findOneAndUpdate({ id: req.params.id }, { age: req.body.age, email: req.body.email })
        res.send('update with success!')
    } catch (err) {
        res.send(err);
    }
});

mongoose.connect('mongodb+srv://root:123@cluster0.9nqqr.mongodb.net/?retryWrites=true&w=majority', (err, done) => {
    if (err) {
        console.log("Error")
    }
    if (done) {
        console.log("Done")
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})