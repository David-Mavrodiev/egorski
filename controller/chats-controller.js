/*globals module exports*/
'use strict';

module.exports = function(usersData) {
    return {
        getAdminsList(req, res) {
            if (req.isAuthenticated()) {
                usersData.findByIsAdmin(true)
                    .then((ads) => {
                        let admins = ads;
                        usersData.findByIsAdmin(false).then((users) => {
                            res.render("../views/show-admins.pug", {
                                result: {
                                    me: req.user,
                                    organizations: admins,
                                    users: users,
                                    IsAdmin: req.user.IsAdmin
                                }
                            });
                        });
                    });
            } else {
                res.render("../views/error.pug", {
                    result: {
                        error: 'Нямате достъп!',
                        back: '/home'
                    }
                })
            }

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
                        userName: user.username,
                        IsAdmin: req.user.IsAdmin
                    }
                });
            } else {
                res.render("../views/error.pug", {
                    result: {
                        error: 'Нямате достъп!',
                        back: '/home'
                    }
                })
            }
        }
    }
}