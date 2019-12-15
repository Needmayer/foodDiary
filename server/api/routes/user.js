import User from '../../dbSchemas/users.js';
import Recipe from '../../dbSchemas/recipe.js';
import MenuGenerator from '../../model/menuGenerator.js';
import ShopListGenerator from '../../model/shopListGenerator.js';

let userRouter = function (router) {

     router.post('/login', async function (req, res) {
        const user = await User.findOne({ email: req.body.email }).exec()
        if (user && user.passwordIsValid(req.body.password)) {
            const userInfo = {
                _id: user._id,
                email: user.email,
                menu: user.menu,
                recipes: user.recipes
            }
            req.session.login(userInfo)
            res.status(200).send(userInfo)
        } else {
            res.status(401).send({ error: "Invalid username or password." })
        }
    });

    router.get('/login', async function (req, res) {
        const sessionUserInfo = req.session.userInfo;
        if (sessionUserInfo !== undefined && sessionUserInfo.email) {
            const user = await User.findOne({ email: sessionUserInfo.email }).exec()
            if (!user) {
                return res.status(400).send({});
            }
            return res.status(200).send({
                _id: user._id,
                email: user.email,
                menu: user.menu,
                recipes: user.recipeIds
            })
        }
    });

    router.post('/user', function (req, res) {
        User.create(req.body, function (err, user) {
            if (err) {
                console.log(err)
                return
            }
            res.status(200).json(user);
        });
    });

    router.post('/logout', function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
                res.status(400).json({});
            } else {
                res.status(200).json({});
            }
        })
    });

    router.post('/user/recipe/', function (req, res) {
        let userId = req.body.userId;
        Recipe.create(req.body, function (err, recipe) {
            if (err) {
                res.status(400).send({error: "request validation failed"});
            } else {
                Recipe.updateOne({_id: recipe._id}, {$push: {userIds: userId}}, 
                    function (err) {
                        if (err) return console.log(err);
                    });
                User.updateOne({_id: userId}, {$push: {recipeIds: recipe._id}}, 
                    function (err) {
                        if (err) return console.log(err);
                        res.status(200).json({});
                });
            }
        });
    });

    router.put('/user/recipe/', function (req, res) {
        Recipe.updateOne({_id: req.body._id}, req.body,
            function (err, recipe) {
                if (err) {
                    res.status(400).send({error: "request validation failed"});
                } else {
                    res.status(200).json({});
                }
            }
        );
    });

    router.get('/user/recipes', function (req, res) {
        let userId = req.session.userInfo._id;
        Recipe.find({userIds: userId}, 
            "title tags description timeConsume energy energyUnit ingrediences", 
            function(err, resp) {
                if (err) console.log(err);
                    res.status(200).json(resp);
            });
    });

    router.put('/user/recipe/:id', function (req, res) {
        let query = { _id: req.params.id };
        let doc = {
            recipes: req.body.recipes
        }
        User.update(query, doc, function (err, respRaw) {
            if (err) return console.log(err);
            res.status(200).json(respRaw);
        });
    });

    router.get('/user/generateMenu', function (req, res) {
        if (!req.session.userInfo || !req.session.userInfo._id) {
            return res.status(200).json({});
        }
        let userId = req.session.userInfo._id;
        Recipe.find({userIds: userId}, "_id tags", 
            function(err, resp) {
                if (err) {
                    console.log(err);
                } else {
                    let menuGenerator = new MenuGenerator();
                    let menu = menuGenerator.generateMenu(resp);
                    User.findOneAndUpdate({_id: userId}, {menu: menu}, {upsert: true},
                        function (err) {
                            if (err) {
                                 return console.log(err);
                            } else {
                                res.status(200).json(menu);
                            }
                    })
                }
            });
    });

    router.get('/user/getMenu', function (req, res) {
        if (!req.session.userInfo || !req.session.userInfo._id) {
            return res.status(200).json({});
        }
        let userId = req.session.userInfo._id;
        User.findOne({_id: userId}, "menu",
            function(err, resp) {
                if (err) {
                    return console.log(err);
               } else {
                   res.status(200).json(resp);
               }
            });
    });

    router.get('/user/getShopList', function (req, res) {
        if (!req.session.userInfo || !req.session.userInfo._id) {
            return res.status(200).json({});
        }
        let userId = req.session.userInfo._id;

        User.findOne({_id: userId}, "menu",
            function(err, resp) {
                if (err) {
                    return console.log(err);
               } else {
                    let shopListGenerator = new ShopListGenerator();
                    let idList = shopListGenerator.getAllRecipeIdsFromMenu(resp.menu);
                    res.status(200).json(idList);
               }
            });
    });
}

export default userRouter;