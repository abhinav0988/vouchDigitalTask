let express = require("express")
let mongoose = require("mongoose")
let rout = require("./router/route")
let app = express()

app.use(express.json())
mongoose.connect("mongodb+srv://abhinav7877:abhinavmangal@abhinav.yhc3th4.mongodb.net/vouchDigitaltask?retryWrites=true&w=majority", {
    useNewUrlParser: true
})

    .then(() => console.log("monggose is connected"))
    .catch((error) => console.log(error))
app.use("/", rout)

app.listen(process.env.Port || 3000, () => {
    console.log("express running on this port" + (process.env.Port || 3000))
})

