const express = require("express");

function atleastoneunhealthy() {
    let atleastoneunhealthy = false;
    for (let i = 0; i < users[0].kidneys.length;i++){
        if (!users[0].kidneys[i].healthy) {
            atleastoneunhealthy = true;
        }
    } 
    return atleastoneunhealthy;
}

const app = express();
app.use(express.json());

const port = 3000;

const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }, {
        healthy:true
    }]
}]

app.get('/', function (req, res) {
    const johnkidney = users[0].kidneys;
    const number = johnkidney.length;
    let health = 0;
    for (let i = 0; i < number; i++){
        if (johnkidney[i].healthy == true) {
            health++;
        }
    }
    const unhealth = number - health;

    res.json({
        number,
        health,
        unhealth
    })
})

app.post('/', function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})


app.put('/', function (req, res) {

    if (atleastoneunhealthy()) {
        for (let i = 0; i < users[0].kidneys.length;i++){
            users[0].kidneys[i].healthy = true;
        }
    
        res.json({});        
    }
    else {
        res.status(411).json({
            msg:"Bro all your Kidneys are Ok Chill."
        })
    }
})



app.delete('/', function (req, res) {

    if (atleastoneunhealthy()) {
        let newKid = [];
        for (let i = 0; i < users[0].kidneys.length; i++){
            if (users[0].kidneys[i].healthy) {
                newKid.push({
                    healthy:true
                })
            }
        }

        users[0].kidneys = newKid;

        res.json({
            msg:"Deleted your kidney Nigga Lol!"
        })        
    }
    else {
        res.status(411).json({
            msg:"Bro WTF!! Your all Kidneys are good alrady FFS!!"
        });
    } 
})


app.listen(port);