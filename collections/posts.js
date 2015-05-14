Posts = new Meteor.Collection('posts');

Meteor.methods({
  post:function(postAttributes){
    var user = Meteor.user();
    var postWithSameLink = Posts.findOne({url: postAttributes.url});

    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");
    
    if (!postAttributes.title)
      throw new Meteor.Error(422, "Please fill in a headline");
    
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302, 
      "The link has already been posted", 
      postWithSamelink);      
    }

    var post = _.extend(_.pick(postAttributes, "url", "title", "message"), {
       title: postAttributes.title + (this.isSimulation ? "(client)" : "(server)"),
       userId: user._id, 
       author: user.email, 
       submitted: new Date().getTime() 
    });

    if (! this.isSimulation) {
      var Future = Npm.require("fibers/future");
      var future = new Future(); 
      Meteor.setTimeout(function() {
        future.return();
      }, 5 * 1000); 
      future.wait();
    }


    var postId = Posts.insert(post);
      return postId;
  }
});

Posts.allow({
  
  update:function(userId, post){
    return 
      ownsDocument(userId, post); }, 
    
     remove: function(userId, post){
      return ownsDocument(userId, post); 
    },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    return 
    (_.without(fieldNames, 'url','title').length > 0);
  }
});