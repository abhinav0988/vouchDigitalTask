let ContactModel = require("../model/contactModel")
let jwt = require("jsonwebtoken")

let ContactCreate = async function (req, res) {
    try {
        let data = req.body
        let validphonNumber = /^[6-9][0-9]{9}$/;
        let validEmaildid = /^\w+([\.-]?\w+)*@[a-z]\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let validfullName = /^[A-Za-z ]+$/;




        let { fullName, PhoneNumber, emailid, password, address } = data
        if (Object.keys(data).length == 0) {
            res.status(400).send({ status: false, msg: "Enter some data" })
        }
        if (!fullName || typeof fullName != "string") {
            res.status(400).send({ status: false, msg: "enter fulLName" })
        }
        if (validfullName.test(fulLName)) {
            res.status(400).send({ status: false, msg: "enter  valid fulLName" })

        }
        if (!PhoneNumber) {
            res.status(400).send({ status: false, msg: "Enter Phone NUmber" })
        }
        if (validphonNumber.test(PhoneNumber)) {
            res.status(400).send({ status: false, msg: "please enter valid phune number" })
        }
        if (!emailid) {
            res.status(400).send({ status: false, msg: "Enter emaild id" })
        }
        if (validEmaildid.tes(emailid)) {
            res.status(400).send({ status: false, msg: "Enter  valid emaild id" })
        }
        if (!password) {
            res.status(400).send({ status: false, msg: "Enter password" })
        }
        if (!address) {
            res.status(400).send({ status: false, msg: "Enter address" })
        }


        let userdetail = await ContactModel.create(data)
        res.status(201).send({ status: true, msg: "contact detail create sucessfuly", userdetail })




    } catch (error) {
        res.status(500).send({ status: false, msg: error })

    }
}


const ceateLogin = async function (req, res) {
    try {
        let emaild = req.body.emaild
        let password = req.body.password
        let usercontactlogin = await ContactModel.findOne({ emaild: emaild, password: password })
        if (!usercontactlogin) {
            res.status(404).send({ status: false, msg: "user does not exits" })
        }
        if (!password) {
            res.status(400).send({ status: false, msg: "enter password" })
        }
        if (usercontactlogin.password != password) {
            res.status(400).send({ status: false, msg: "inccorect password!!!!" })
        }

        let token = jwt.sign({
            userId: usercontactlogin._id.toString(),
            organisation: "vouchDigitial"
        },
            "Abhinav-1", { expiresIn: "12h" }

        )
        res.status(200).send({ status: true, data: token })


    } catch (error) {
        res.status(500).send({ status: false, msg: "server error", error })
    }
}


const contactdetailfetch = async function (req, res) {
    try {
        let query = req.query
        let { fulLName, PhoneNumber } = query
        if (!query) {
            let contactdetail = await ContactModel.find({ isDeleted: false })
            if (contactdetail.length == 0) return res.status(404).send({ status: false, message: "no conatct found" })
            return res.status(200).send({ status: true, message: "contact found sucessfully", data: contactdetail })
        }
        if (fullName) {
            const fulLName = query.fulLName
            const book = await bookModel.find({ fulLName: fulLName })
            if (book.length == 0) { return res.status(404).send({ status: false, msg: "no conatct found that name" }) }
        }
        if (PhoneNumber) {
            const PhoneNumber = query.PhoneNumber
            const book = await bookModel.find({ PhoneNumber: PhoneNumber })
            if (book.length == 0) { return res.status(404).send({ status: false, msg: "no data found that number" }) }
        }
        let getAlldetail = await bookModel.find(query)
        if (getAlldetail.length == 0) return res.status(404).send({ status: false, message: "contact Not Found" })
        return res.status(200).send({ status: true, msg: "Contact List", data: getAlldetail })





    } catch (error) {
        res.status(500).send({ status: false, msg: "server error", error })

    }
}

let updatecontact = async function (req, res) {
    try {
        let ContactId = req.params.ContactId;
        let isValidId = mongoose.Types.ObjectId.isValid(ContactId)
        if (!isValidId) return res.status(400).send({ status: false, msg: "invalid contact user id!" })


        let contact = await ContactModel.findOne({ _id: ContactId, isDeleted: false })
        if (!contact) {
            return res.status(404).send({ status: false, message: "No conatc found" })
        }
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Please provide with valid request in the body!" })
        }
        const { fullName, PhoneNumber } = data
        if (fullName) {
            let fullNamePresent = await ContactModel.find({ fullName: fullName, isDeleted: false })
            if (fullNamePresent.length !== 0) {
                return res.status(400).send({ status: false, message: "This fullName has already been taken!" })
            }
            contact.fullName = fullName;
        }
        if (PhoneNumber) {
            let PhoneNumberPresent = await ContactModel.find({ PhoneNumber: PhoneNumber, isDeleted: false })
            if (PhoneNumber.length !== 0) {
                return res.status(400).send({ status: false, message: "This PhoneNumber has already been taken!" })
            }
            contact.fullName = fullName;
        }
        contact.save()
        res.status(200).send({ status: true, message: "Contact update succesfully!", data: contact })
    } catch (error) {
        res.status(500).send({ status: false, msg: "server error", error })

    }
}

let deletecontact = async function (req, res) {
    try {
        let data = req.params.contactId
        let isValid = mongoose.Types.ObjectId.isValid(data)
        if (!isValid) return res.status(400).send({ status: false, msg: "Enter valid ContactId" })

        let alreadyDeleted = await ContactModel.findOne({ _id: data, isDeleted: true })
        if (alreadyDeleted) return res.status(404).send({ status: false, msg: "This conatact has already been deleted!" })

        let update = await ContactModel.findOneAndUpdate({ _id: data }, { $set: { isDeleted: true } }, { new: true })

        if (!update) return res.status(404).send({ status: false, msg: "No contact with such contactId exists!" })

        res.status(200).send({ status: true, msg: "Deletion successful!", update })


    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


module.exports.ContactCreate = ContactCreate
module.exports.ceateLogin = ceateLogin
module.exports.contactdetailfetch = contactdetailfetch
module.exports.updatecontact = updatecontact
module.exports.deletecontact = deletecontact
