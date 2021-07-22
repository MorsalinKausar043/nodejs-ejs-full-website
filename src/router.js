const express = require("express");
const router = express.Router();
const EjsUser = require("./models/conn");

// middleware
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
    res.status(201).render("index");
})

router.get("/login", (req, res) => {
    res.status(201).render("login");
})
router.get("/ragistration", (req, res) => {
    res.status(201).render("ragistration");
})

router.get("/error", (req, res) => {
    res.status(201).render("error");
})

// regostratom post userdata

router.post("/ragistration", async (req, res) => {
    try
    {
        const password = req.body.password;
        const Cpassword = req.body.Cpassword;

        if (password === Cpassword)
        {
            const jsuserdata = new EjsUser({
                fname: req.body.fname,
                lname: req.body.lname,
                number: req.body.number,
                email: req.body.email,
                address : req.body.address ,
                gender: req.body.gender,
                password: password,
                Cpassword : Cpassword
                
            })

            await jsuserdata.save();
            res.status(201).render("index")
        } else
        {
            res.status(404).render("error" , { werror : "invalid password"})
        }
        
    } catch (error) {
        res.status(404).render("error" , {werror : error})
    }
})

// post login userdata

router.post("/login", async (req, res) => {
    try
    {
        const email = req.body.email;
        const password = req.body.password;
        const Userdata = await EjsUser.findOne({ email: email });
        Userdata.password === password ? res.status(201).render("index") : res.status(404).render("error", { werror: "invalid password" });
        
    } catch (error) {
        res.status(404).render("error", { werror: error });
    }
})

module.exports = router;