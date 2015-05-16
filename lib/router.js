Router.configure({

  waitOn: function(){
    return [Meteor.subscribe('posts'),
     Meteor.subscribe('comments')];
  }
  
});

Router.route('/', function() {
  if (this.ready()){
    this.render('postsList');
  }

  else {
    this.render('loading')
  }
});

var requireLogin = function(){
  if(!Meteor.user()){
      this.render('accessDenied');
    }
  else if (Meteor.loggingIn()){
    this.render("loading");
  } 
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
  if(!Meteor.user){
    this.render("accessDenied")
  }
  else {
    this.render("postSubmit");
  }
});

// Router.onBeforeAction('dataNotFound', {only: 'postPage'});
// Router.onBeforeAction(requireLogin, {only: 'postSubmit'});