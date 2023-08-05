const express = require ("express");
const Joi = require ("joi");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const port = 2023

const server = express();
server.use(cors());

dotenv.config()
server.post("/createUser", bodyParser.json(), async(req, res) =>{

} )

server.post("/createUser", (req, res)=>{
    const schemas = Joi.object({
        username: Joi.string().min(3).max(1024).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8),
    });

    const { error } = schemas.validate(req.body);
    
    if (error) {
        return res.status(400).send({
            responseCode: "96",
            responseMessage: error.details[0].message,
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const token = jwt.sign({email: req.body.email}, process.env.secretKey, {expiresIn: "3m"})

    // save to DB

    res.status(200).send({
        responseCode: "00",
        responseMessage: "Successful",
        data: {
            username: req.body.username,
            email: req.body.email,
            hashedPassword,
            token
        }
    })
});
 

server.get("/", (_reg, res)=>{
    res.send("Welcome to our resful APIs")
});

server.listen(port, () =>{
    console.log(`server is running on ${port}`);
})