const router = require("express").Router();
const User = require("../models/User");

// Get all users route
router.get("/", async (req, res) => {
    await User.find()
        .then(user => res.send(user))
        .catch(err => res.status(400).send(err))
})

//  User sign in route
router.post("/SignIn", async (req, res) => {

    // Get request data.
    const { email, password } = req.body;

    // Check user account availability
    let user = await User.findOne({ email });
    if (!user) return res.status(404).send("Invalid email! If you don't have an account, please sign up.");

    // Check password
    const isValidPassword = user.password === password;
    if (!isValidPassword) return res.status(404).send("Incorrect password, Please enter valid password!");

    registerdUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        nic: user.nic,
    };
    return res.status(200).send(registerdUser);
});

//  User sign up route
router.post("/SignUp", async (req, res) => {

    // Get request data.
    const { name, email, password, mobile, gender, nic } = req.body;

    // Check email is already used
    const emailExist = await User.findOne({ email });
    if (emailExist) return res.status(404).send("This email is already registered!");

    // Create new user
    const user = new User({
        name,
        email,
        password,
        mobile,
        gender,
        nic
    });

    try {
        const createdUser = await user.save();
        res.send(createdUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete user route
router.delete("/DeleteUser/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
        .then(() => res.send("User deleted succesfully."))
        .catch(err => res.status(400).send("Something went wrong, delete acoount again!"));
});

// Route for update user
router.put("/UpdateUser/:id", async (req, res) => {

    // Get response body data.
    const { name, mobile, gender, nic } = req.body;

    await User.findById(req.params.id)
        .then(user => {
            user.name = name;
            user.mobile = mobile;
            user.gender = gender;
            user.nic = nic;

            user.save()
                .then((u) => {
                    let updatedUser = {
                        id: u._id,
                        name: u.name,
                        email: u.email,
                        mobile: u.mobile,
                        gender: u.gender,
                        nic: u.nic,
                    };
                    res.send(updatedUser)
                })
                .catch(err => res.status(400).send('Error: ' + err));
        })
        .catch(err => {
            console.log(err)
            res.status(400).send("Something went wrong, Update user acoount again!")
        });
});

module.exports = router;