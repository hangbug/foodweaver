/**
 * Created by HANG on 10/12/2016.
 */
'use strict';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import mongoose from 'mongoose';
import routes from '../app/routes';
import configureStore from './../app/store/configureStore';
import register from './routes/registerUsers';
import auth from './routes/auth';
import authenticate from './middlewares/authenticate';
import checkUserLikes from './middlewares/checkUserLikes';
import deleteUserLikes from './middlewares/deleteUserLikes';
import authLikeIcon from './middlewares/authLikeIcon';
import find from './routes/find';
import loadMore from './routes/loadMore';
import posts from './models/posts';
import users from './models/users';
import redis from 'redis';


const client = redis.createClient(6379,'localhost');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisStore=connectRedis(session);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/recipe').catch((e)=>{
    throw e;
});


const app = express();
app.use(bodyParser.json());
app.use(session({
    secret:'hshfsbfajsfsfsfb',
    store:new redisStore({
        host:'localhost',
        port:6379,
        client: client,
        ttl :  60*60*24*30
    }),
    saveUninitialized: false,
    resave: false
}));



app.use('/api/users',register);//user register
app.use('/api/auth',auth);//authentication
app.use('/api/category',find);//use to search the categories on homepage navbars
app.use('/api/loadMore',loadMore);//load more data from server



app.use('/app',(req,res)=>{
    posts.create({title: "Chemex Coffee",display_src:"http://www.recipe.com/images/indian-spiced-chicken-thighs-1-ss.jpg",description: "Make a cup of chemex category, the proper way"}).catch((e)=>{
        console.log(e);
    });
    res.end()
});

// get all bookmarks for user from server
app.put('/bookmark',authenticate,(req,res)=>{
    const {userId}=req.session.user;
    return users.findOne({'_id':userId}).then((user)=>{
            return posts.find({'_id':{$in:user.bookmark}},{title:1,description:1,display_src:1,likes:1,likePositive:1});
        }).then((data)=>{
            res.json(data);
        }).catch((e)=>{
           console.log(e);
        })
});

//save post to bookmark list for user in server
app.put('/save/:postId',authenticate,(req,res)=>{
    const postId=req.params.postId;
    const {userId}=req.session.user;
    return users.findOne({_id:userId},{bookmark:{$elemMatch:{$eq:postId}}}).then((value)=>{
            if(!value.bookmark.length){
                return users.update({_id:userId},{$push:{bookmark:postId}});
            }else{
                res.status(409).json({error:'you have already saved'});
            }
        }).catch((e)=>{
            console.log(e);
        })

});

//delete bookmark from bookmark list for one user in server
app.put('/deleteBookMark/:bookmarkId',authenticate,(req,res)=>{
    const bookmarkId=req.params.bookmarkId;
    const {userId}=req.session.user;
    res.end();
    return users.update({_id:userId},{$pull:{bookmark:bookmarkId}}).catch((e)=>{
        console.log(e);
    })
});

//get the comments for every post by postId
app.get('/api/comments/:postId',(req,res)=>{
    const postId=req.params.postId;
    return client.llenAsync('comments:'+postId).then((value)=>{
        if(value){
            return client.lrangeAsync('comments:'+postId,0,-1).then((data)=>{
                return Promise.all(data.map((item)=>{
                    return client.hgetallAsync(item);
                }))
            }).then((comments)=>{
                res.json(comments);
            })
        }else{
            return posts.findById(postId).then((data)=>{
                res.json(data.comments);
                return Promise.all(data.comments.map((comment)=>{
                    return client.rpushAsync('comments:'+postId,'comments:'+postId+':'+comment._id).then(()=>{
                        return client.hmsetAsync('comments:'+postId+':'+comment._id,'author',comment.author,'text',comment.text,'comment_date',comment.comment_date)
                    })
                }))
            })
        }
    }).catch((e)=>{
        console.log(e);
    });

});

// add comments api
app.put('/addComment/:postId',authenticate,(req,res)=>{
    const postId=req.params.postId;
    const comment=req.body.comment;
    const author=req.session.user.username;
    let commentId=undefined;
    let comment_date=undefined;
    res.json(author);
    return posts.update({_id:postId},{$push:{comments:{author:author,text:comment}}}).then(()=>{
                return posts.findById(postId);
            }).then((data)=>{
                comment_date=data.comments[data.comments.length-1].comment_date;
                commentId=data.comments[data.comments.length-1]._id;
            }).then(()=>{
                return client.llenAsync('comments:'+postId)
            }).then((value)=>{
                    if(value){
                        return client.rpushAsync('comments:'+postId,'comments:'+postId+':'+commentId).then(()=>{
                                return client.hmsetAsync('comments:'+postId+':'+commentId,'author',author,'text',comment,'comment_date',comment_date)
                            })
                    }
            }).catch((e)=>{
                console.log(e);
            })

});

app.post('/logout',(req,res)=>{
    req.session.destroy();
    res.end();
});
//add likes to cache and mongodb
app.post('/addlike/:id',authenticate,checkUserLikes,(req,res)=>{
    const postId=req.params.id;
    return client.hgetallAsync('post:'+postId).then((value)=>{
        if(value){
            return client.hincrbyAsync('post:'+postId,'likes',1).then(()=>{//update cache
                return posts.update({_id:postId},{$inc:{likes:1}});//update database
            })
        }else{
            return posts.update({_id:postId},{$inc:{likes:1}});
        }
    }).then(()=>{
        res.end();
    }).catch((e)=>{
        console.log(e);
    })
});
//minus likes api to cache and mongodb
app.post('/decrLike/:id',authenticate,deleteUserLikes,(req,res)=>{
    const postId=req.params.id;
    return client.hgetallAsync('post:'+postId).then((value)=>{
        if(value){
            return client.hincrbyAsync('post:'+postId,'likes',-1).then(()=>{//update cache
                return posts.update({_id:postId},{$inc:{likes:-1}});//update database
            })
        }else{
            return posts.update({_id:postId},{$inc:{likes:-1}});
        }
    }).then(()=>{
        res.end();
    }).catch((e)=>{
        console.log(e);
    })
});
// searching post by id  and write it into cache
app.get('/post/:id',(req,res)=>{
    let post={};
    const postId=req.params.id;
    return client.hgetallAsync('post:'+postId).then((value)=>{ //search in cache
                if(value){
                    post={...value};
                    return client.lrangeAsync('post:'+postId+':steps',0,-1).then((steps)=>{
                                post.steps=steps;
                                return client.lrangeAsync('post:'+postId+':ingredients',0,-1);
                            }).then((ingredients)=>{
                                post.ingredients=ingredients;
                            }).then(()=>{
                                res.json(post);
                            })

                }
                else{
                    return posts.findOne({'_id':postId},{_id:0,comments:0,likePositive:0,create_date:0,__v:0}).then((data)=>{  //search in mongodb and store to cache
                        res.json(data);
                        return client.hmsetAsync('post:'+postId,'title',data.title,'display_src',data.display_src,'description',data.description,'ingredients','post:'+postId+':ingredients','steps','post:'+postId+':steps','likes',data.likes)
                            .then(()=>{
                                return Promise.all(data.steps.map((step)=>{
                                    return client.rpushAsync('post:'+postId+':steps',step);
                                }))
                            })
                            .then(()=>{
                                return Promise.all(data.ingredients.map((ingredient)=>{
                                    return client.rpushAsync('post:'+postId+':ingredients',ingredient);
                                }))
                            })
                    })
                }
            }).catch((e)=>{
                console.log(e);
            })
});
// get the search result from server

app.put('/search/:item',(req,res)=>{
    const item=req.params.item;
    return posts.find({title:{$regex:item,$options:'i'}},{title:1,description:1,display_src:1,likes:1,likePositive:1}).then((data)=>{
        res.json(data);
    }).catch((e)=>{
        console.log(e);
    })
});
//to hightlight the like button

app.use('/loadUserLikes',authLikeIcon,(req,res)=>{
    const {userId}=req.session.user;
    return users.findOne({_id:userId},{_id:0,likes:1}).then((user)=>{
        if(user.likes.length){
            res.json(user.likes);
        }else{
            res.status(204).json();
        }
    }).catch((e)=>{
        console.log(e);
    })
});








app.use(express.static('public'));
function renderFullPage(html, initialState) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel='stylesheet' href='/css.min.css'/>
      <link rel='stylesheet' href='/vendor/bootstrap.min.css'/>
     
    </head>
    <body>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <div id="root">
          <div>
          ${html}
          </div>
      </div>
      <script src="/vendor/jquery-3.1.1.min.js"></script>
      <script src="/vendor/bootstrap.min.js"></script>
      <script src='/bundle.js'></script>
      <script src="/vendor/jquery.bootstrap-autohidingnavbar.js"></script>
      <script >(function ($) {
          $(document).ready(function(){
            $(".navbar-fixed-top").autoHidingNavbar();
	      });
        }(jQuery));
      </script>
    </body>
    </html>
  `;
}

app.use('/',(req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).end(`Internal Server Error ${err}`);
        } else if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps)  {
            posts.find({},{'title':1,'description':1,'display_src':1,'likes':1,'likePositive':1})
                .sort({'likes':-1})
                .limit(8)
                .then((data)=>{
                    const store = configureStore({posts:data});
                    const InitialComponent = renderToString(
                        <Provider store={store}>
                            <RouterContext {...renderProps} />
                        </Provider>
                    );
                    res.end(renderFullPage(InitialComponent,store.getState()));
                })
        } else {
            res.status(404).end('Not found');
        }
    });
});
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});