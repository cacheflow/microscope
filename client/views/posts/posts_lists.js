Template.postsList.helpers({
  posts:function(){
    return Posts.find({}, {sort: {subimtted: -1}});
  },
  comments:function(){
    return Comments.find({postId: this._id});
  }
});