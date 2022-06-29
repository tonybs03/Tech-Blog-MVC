const router = require('express').Router();
const { User,Post,Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//POST A COMMENT
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
                com_content: req.body.com_content,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            })
            .then(commentData => res.json(commentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});


module.exports = router;