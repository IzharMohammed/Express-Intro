// Creating HTTP server using express 

const express = require('express');

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

var user = [{
    name: 'john',
    kidneys: [{
        healthy: true
    },
    {
        healthy: false
    },
    {
        healthy: true
    },
    {
        healthy: false
    }
    ]
}]

app.get('/', (req, res) => {
    let noOfHealthyKidneys = 0;
    const johnKidneys = user[0].kidneys;
    const noOfKidneys = johnKidneys.length;

    /*   for (let i = 0; i < johnKidneys.length; i++) {
          if (johnKidneys[i].healthy) {
              noOfHealthyKidneys++;
          }
      } */

    noOfHealthyKidneys = johnKidneys.filter(kidneys => kidneys.healthy)
    let healthyKidneys = noOfHealthyKidneys.length;
    const noOfUnhealthyKidneys = noOfKidneys - healthyKidneys;
    res.json({
        noOfKidneys,
        healthyKidneys,
        noOfUnhealthyKidneys
    })
})

app.post('/', (req, res) => {
    const isHealthy = req.body.isHealthy;
    console.log('is Healthy', isHealthy);
    user[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        message: 'Kidney added successfully',
        user: user[0]
    });
})

app.put('/', (req, res) => {
    user[0].kidneys.map(kidney => {
        kidney.healthy = true;
    })

    res.json({
        message: "changed successfully"
    })
})

app.delete('/', (req, res) => {

    if (isThereUnhealthyKidney()) {
        user[0].kidneys = user[0].kidneys.filter(kidney => kidney.healthy == true);
        res.json({
            msg: 'deleted successfully'
        })
    } else {
        res.status(411).json({
            msg: 'bhaii your kidneys are healthy',
        })
    }

})

const isThereUnhealthyKidney = () => {
    return user[0].kidneys.some(kidney => !kidney.healthy);
}

app.listen(5000);