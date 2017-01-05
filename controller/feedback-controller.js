'use strict';

module.exports = function(feedbackData) {
    return {
        getAll(req, res) {
            feedbackData.getAll().then((feedbacks) => {
                res.send(feedbacks);
            });
        },
        create(req, res) {
            let feedback = req.body;
            feedbackData.create(feedback).then((f) => {
                res.send(f);
            });
        }
    }
}