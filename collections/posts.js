Posts = new Meteor.Collection('posts');

Meteor.methods({
  postInsert:function(postAttributes){
    check(this.userId, String); 
    check(postAttributes, {
      title: String, 
      url: String
    });

    var errors = validatePost(postAttributes);
      if(errors.title || errors.url)
        throw new Meteor.Error('invalid-post', "You must set a valid title and url for your post");

    if (Meteor.isServer) {
      postAttributes.title +="(server)";
      Meteor._sleepForMs(5000);
    }
    else {
      postAttributes.title +="(client)";
    }

    var user = Meteor.user();
    var postWithSameLink = Posts.findOne({ url: postAttributes.url}); 
    if (postWithSameLink) { 
      return { 
        postExists: true, _id: postWithSameLink._id 
      } 
    }

    var post = _.extend(postAttributes, {
      name: user._id, 
      author: user.username, 
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {_id: postId};

  }
});

    validatePost = function(post) {
      var errors = {};

      if (!post.title)
        errors.title = "Please fill in a headline";
      if(!post.url)
        errors.url = "Please fill in a url";

      return errors;
    }


Posts.allow({
  update: function(userId, post){
    return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
  });

Posts.deny({
  update: function(userId, post, fieldNames, modifier){
    var errors = validatePost(modifier.$set)
    return errors.title || errors.url;
  }
});
