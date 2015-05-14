Router.configure({

  waitOn: function(){
    return Meteor.subscribe('posts');
  }
  
});

Router.route('/', function() {
  if (this.ready()){
    this.render('postsList');
  }

  else {
    this.render('accessDenied')
  }
});

var requireLogin = function(){
  if(!Meteor.user()){
      this.render('layout');
    }
  // else if (Meteor.loggingIn()){
  //   this.render("loading");
  // } 
  else {
    this.next();
  }
}

Router.route('/posts/:_id/edit', function(){
  this.render('postEdit', {
    data: function(){
      return Posts.findOne(this.params._id)
    }
  });
});

Router.route('/posts/:_id', function(){
  this.render('postPage', { 
    data: function() {
      return Posts.findOne(this.params._id);
    }
  }); 
});

Router.route('/submit', function(){
  if(!Meteor.user()){
    this.render("accessDenied");
  }
  else {
    this.next();
  }
});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
// Router.onBeforeAction(requireLogin, {only: '/submit'});