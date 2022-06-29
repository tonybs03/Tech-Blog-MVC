const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a post
router.post("/", withAuth, (req, res) => {
    Post.create({
            title: req.body.title,
            content: req.body.post_content,
            user_id: req.session.user_id
        })
        .then((postData) => res.json(postData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// EDIT A POST
router.put("/:id", withAuth, (req, res) => {
    Post.update({
            title: req.body.post_title,
            content: req.body.post_content,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((postData) => {
            if (!postData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(postData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//DELETE A POST
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((postData) => {
            if (!postData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(postData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;