'use strict';

const passport = require('passport');

module.exports = function(data) {
    return {
        loginLocal(req, res, next) {
            const auth = passport.authenticate('local', function(error, user) {
                if (error) {
                    next(error);
                    return;
                }

                if (!user) {
                    res.render('../views/error.pug', {
                        result: {
                            error: 'Грешно име или парола!',
                            back: '/login'
                        }
                    });
                }

                req.login(user, error => {
                    if (error) {
                        next(error);
                        return;
                    }

                    res.redirect('/home');
                });
            });

            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            res.redirect('/home');
        },
        register(req, res, next) {
            data.findByUsername(req.body.username)
                .then(u => {
                    if (u) {
                        res.render('../views/error.pug', {
                            result: {
                                error: 'Потребителското име е заето!',
                                back: '/login'
                            }
                        });
                    } else {
                        const user = {
                            username: req.body.username,
                            password: req.body.password
                        };

                        data.createUser(user)
                            .then(() => {
                                const auth = passport.authenticate('local', function(error, user) {
                                    if (error) {
                                        next(error);
                                        return;
                                    }

                                    if (!user) {
                                        res.render('../views/error.pug', {
                                            result: {
                                                error: 'Грешно име или парола!',
                                                back: '/login'
                                            }
                                        });
                                    }

                                    req.login(user, error => {
                                        if (error) {
                                            next(error);
                                            return;
                                        }

                                        res.redirect('/home');
                                    });
                                });

                                auth(req, res, next);
                            });
                    }
                })
        }
    }
};