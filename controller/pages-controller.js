'use strict';
let registeredNumber = 0;

module.exports = function(signalsData) {
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