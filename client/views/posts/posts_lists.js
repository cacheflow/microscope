Template.postsList.helpers({
  posts:function(){
    return Posts.find({}, {sort: {subimtted: -1}});
  }
});