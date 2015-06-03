Meteor.publish('posts', function(){
  return Posts.find();
});

Meteor.publish('comments', function(){
  return Comments.find();
});

Meteor.publish("notifications", function(){
  return Notifications.find();
});










