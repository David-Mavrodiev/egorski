'use strict';
let registeredNumber = 0;

module.exports = function(signalsData, usersData) {
    return {
        getHome(req, res) {
            if (req.isAuthenticated()) {
                const user = req.user;
                res.render("../views/home.pug", {
                    result: {
                        isUserAuthenticated: true,
                        username: user.username
                    }
                });
            } else {
                res.render("../views/home.pug", {
                    result: {
                        isUserAuthenticated: false
                    }
                });
            }
        },
        getHelp(req, res) {
            res.render("../views/help.pug");
        },
        getSend(req, res) {
            res.render("../views/send.pug");
        },
        getResponse(req, res) {
            res.render("../views/response.pug");
        },
        getAdminsList(req, res) {
            usersData.findByIsAdmin(true)
                .then((ads) => {
                    let admins = ads;
                    usersData.findByIsAdmin(false).then((users) => {
                        res.render("../views/show-admins.pug", {
                            result: {
                                me: req.user,
                                organizations: admins,
                                users: users
                            }
                        });
                    });
                });
        },
        getChat(req, res) {
            let user;

            if (req.isAuthenticated()) {
                user = {
                    username: req.user.username
                };
                let admin = {
                    username: req.params.username
                };
                //console.log(user.username + " " + admin.username)
                res.render("../views/chat.pug", {
                    result: {
                        adminName: admin.username,
                        userName: user.username
                    }
                });
            }
        },
        response(req, res) {
            let body = req.body;
            console.log(body);
            signalsData.findByRegisteredNumber(body.registeredNumber).then((signal) => {
                //console.log(signal.answer);
                res.send(signal.answer);
            });
        },
        send(req, res) {
            let body = req.body;
            registeredNumber++;
            signalsData.createSignal(body, registeredNumber);
            res.send("" + registeredNumber);
        }
    }
}