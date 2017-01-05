'use strict';
module.exports = function(signalsData, feedbackData) {
    return {
        getHome(req, res) {
            if (req.isAuthenticated()) {
                const user = req.user;
                res.render("../views/home.pug", {
                    result: {
                        isUserAuthenticated: true,
                        username: user.username,
                        IsAdmin: user.IsAdmin
                    }
                });
            } else {
                feedbackData.getAll().then((feedbacks) => {
                    res.render("../views/home.pug", {
                        result: {
                            isUserAuthenticated: false,
                            feedbacks: feedbacks
                        }
                    });
                });
            }
        },
        getHelp(req, res) {
            if (req.isAuthenticated()) {
                res.render("../views/help.pug");
            } else {
                res.render("../views/error.pug", {
                    result: {
                        error: 'Нямате достъп!',
                        back: '/home'
                    }
                })
            }
        },
        getSend(req, res) {
            if (req.isAuthenticated()) {
                res.render("../views/send.pug");
            } else {
                res.render("../views/error.pug", {
                    result: {
                        error: 'Нямате достъп!',
                        back: '/home'
                    }
                })
            }
        },
        getResponse(req, res) {
            if (req.isAuthenticated()) {
                res.render("../views/response.pug");
            } else {
                res.render("../views/error.pug", {
                    result: {
                        error: 'Нямате достъп!',
                        back: '/home'
                    }
                })
            }
        },
        getAllSignals(req, res) {
            if (req.isAuthenticated()) {
                const user = req.user;
                if (user.IsAdmin) {
                    signalsData.findAll().then((signals) => {
                        res.render("../views/all-signals.pug", {
                            result: {
                                signals: signals
                            }
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
            } else {
                res.render("../views/error.pug", {
                    result: {
                        error: 'Нямате достъп!',
                        back: '/home'
                    }
                })
            }
        },
        getSignal(req, res) {
            if (req.isAuthenticated() && req.user.IsAdmin) {
                const number = req.params.registeredNumber;
                signalsData.findByRegisteredNumber(number).then((s) => {
                    res.render("../views/show-signal.pug", {
                        result: s
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
        updateSignal(req, res) {
            if (req.isAuthenticated()) {
                let body = req.body;
                console.log(body.answer + " " + body.registeredNumber);
                signalsData.findByRegisteredNumber(body.registeredNumber).then((signal) => {
                    signal.answer = body.answer;
                    signal.save();
                    res.send();
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
        response(req, res) {
            if (req.isAuthenticated()) {
                let body = req.body;
                console.log(body);
                signalsData.findByRegisteredNumber(body.registeredNumber).then((signal) => {
                    //console.log(signal.answer);
                    res.send(signal.answer);
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
        send(req, res) {
            if (req.isAuthenticated()) {
                let body = req.body;
                signalsData.getNumberOfAllSignals().then((count) => {
                    signalsData.createSignal(body, count);
                    res.send("" + count);
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