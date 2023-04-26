const express = require('express');
const mongoose = require('mongoose');
const userModel = require("./models/user");

const app = express();
const PORT = process.env.PORT || 5000;

// BodyParser
app.use(express.json());

const mongoDbUri = "mongodb+srv://Arsalan:oWHZuDKYZ9vh54RR@cluster0.qn5yksf.mongodb.net/LearnMongoDB";

mongoose.connect(mongoDbUri)
    .then((res) => console.log("DB Connect Successfully"))
    .catch((err) => console.log("Db Error", err));

app.get('/api/user/:userid', (req, res) => {
    console.log("params", req.params);
    const { userid } = req.params;
    console.log(userid);
    // Aik unique id se data get kraana ho tw
    userModel.findById(userid)
        .then(userData => {
            res.send({
                message: "User Successfully Get",
                data: userData,
                status: true
            });
        })
        .catch(err => {
            res.send({
                message: `Error: ${err}`,
                status: false
            });
        })

    // User ke data ke kisi b key se data get kraana hotw (yeh starting se find krega aur jo isko pehla object milega jiski entity match kre baaqi neeche wale saary ignore krega)
    // userModel.findOne({ first_name: 'Arsalan' })
    //     .then(userData => {
    //         res.send({
    //             message: "User Successfully Get",
    //             data: userData,
    //             status: true
    //         });
    //     })
    //     .catch(err => {
    //         res.send({
    //             message: `Error: ${err}`,
    //             status: false
    //         });
    //     })

    // User ke data ke kisi b Object ki key se data get kraana hotw (yeh us value se jo b match krega saara data le aayega aur data array mai aayega)
    // userModel.find({ first_name: 'Arsalan' })
    //     .then(userData => {
    //         res.send({
    //             message: "User Successfully Get",
    //             data: userData,
    //             status: true
    //         });
    //     })
    //     .catch(err => {
    //         res.send({
    //             message: `Error: ${err}`,
    //             status: false
    //         });
    //     })

    // Method Depricated
    // userModel.findById(userid, (err, userData) => {
    //     if (err) {
    //         res.send({
    //             message: `Error: ${err}`,
    //             status: false
    //         });
    //     } else {
    //         response.send({
    //             message: "User Successfully Get",
    //             data: userData,
    //             status: true
    //         });
    //     }
    // })
    // res.send("Welcome User.")
});

app.post('/api/user', (request, response) => {
    console.log(request.body);
    const { firstName, lastName, email, mobNum, password } = request.body;

    // Validation
    if (!firstName || !lastName || !email || !mobNum || !password) {
        response.json({
            message: `Error: Required Fields Are Missing`,
            status: false
        })
    }

    const objToSend = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        mob_num: mobNum,
        password: password,
    }

    userModel.create(objToSend)
        .then(() => {
            response.json({
                message: "User created successfully.",
                data: objToSend,
                status: true
            })
        })
        .catch((err) => {
            response.json({
                message: `Error: ${err}`,
                status: false
            })
        })

    // ==== Error: Model.create() no longer accepts a callback ==== 

    // userModel.create(ObjToSend, (error, data) => {
    //     if (error) {
    //         response.send(`Error: ${error}`);
    //     } else {
    //         response.send("USER SUCCESSFULLY CREATED");
    //     }
    // });
    // res.send("Create User.")
});


app.listen(PORT, () => console.log("Server listening on port " + PORT));