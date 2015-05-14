Posts = new Meteor.Collection('posts');



Posts.allow({

  insert:function(userId, doc){
    return userId;
  },

  update:function(userId, post){
    return 
      ownsDocument(userId, post); 
  }, 
    
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