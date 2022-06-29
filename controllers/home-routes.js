const router = require('express').Router();
const sequelize = require('../config/connection');
const { User,Post,Comment } = require('../models');


// GET all posts
router.get('/', (req, res) => {
  Post.findAll({
          attributes: [
              'id',
              'title',
              'content',
              'date_created'
          ],
          include: [
              {
                  model: Comment,
                  attributes: ['id', 'com_content', 'post_id', 'user_id', 'date_com_created'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(postData => {
          const posts = postData.map(post => post.get({plain: true}));

          res.render('homepage', {posts, loggedIn: req.session.logged_in});
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


// GET ONE SINGLE POST
router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                'date_created'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'com_content', 'post_id', 'user_id', 'date_com_created'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }

            const post = postData.get({
                plain: true
            });

            res.render('home-single-post', {
                post,
                loggedIn: req.session.logged_in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// LOGIN route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

// SIGNUP route
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }

  res.render('signup');
});


module.exports = router;



// router.get('/', (req, res) => {
//   Post.findAll({
//           attributes: [
//               'id',
//               'title',
//               'content',
//               'created_at'
//           ],
//           include: [{
//                   model: Comment,
//                   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                   include: {
//                       model: User,
//                       attributes: ['username']
//                   }
//               },
//               {
//                   model: User,
//                   attributes: ['username']
//               }
//           ]
//       })
//       .then(dbPostData => {
//           const posts = dbPostData.map(post => post.get({
//               plain: true
//           }));

//           res.render('homepage', {
//               posts,
//               loggedIn: req.session.loggedIn
//           });
//       })
//       .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//       });
// });