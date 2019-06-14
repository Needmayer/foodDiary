import User from '../../models/users.js';

let userRouter = function (router) {

    router.get('/user', function (req, res) {
        res.status(200).json({"aadsf": "asdf"});
    });

    router.get('/user/:id', function (req, res) {
        User.findById(req.params.id).exec()
        .then(docs => res.status(200)
            .json(docs))
        .catch(err => res.status(500)
            .json({
                message: 'Error finding user',
                error: err
            })
        )
    });

    router.post('/login', async function (req, res) {
        const user = await User.findOne({email: req.body.email}).exec()
        if (user && user.passwordIsValid(req.body.password)) {
            const userInfo = {
                _id: user._id,
                email: user.email,
            }
            req.session.login(userInfo)
            console.log(req.session)
            res.status(200).send(userInfo)
        } else {
            res.status(401).send({ error: "Invalid username or password." })
        }
    });

    router.get('/login', async function (req, res) {
        console.log(req.session)
        const sessionUserInfo = req.session.userInfo;
        if (sessionUserInfo !== undefined && sessionUserInfo.email) {
            const user = await User.findOne({ email: sessionUserInfo.email }).exec()
            if (!user) {
                return res.status(400).send({});
            }
            return res.status(200).send({
                _id: user._id,
                email: user.email,
            })
        }
    });

    router.post('/user', function (req, res) {
        let user = new User(req.body);
        user.save(function (err, user){
            if (err) {
                console.log(err)
                return
            }
            res.status(200).json(user);
        });
    });

    router.post('/logout', function (req, res) {
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
                res.status(400).json({});
            } else {
                res.status(200).json({});
            }
        })
    });

    router.put('/user/:id', function (req, res) {
        let query = { _id: req.params.id };
        let doc = {
            username : req.body.username,
            password : req.body.password,
            role : req.body.role
        }
        User.update(query, doc, function (err, respRaw) {
            if (err) return console.log(err);
            res.status(200).json(respRaw);
        });
    });
}

export default userRouter;