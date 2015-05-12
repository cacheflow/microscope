Router.configure({
  layoutTemplates: "layout",
  loadingTemplates: "loading",

  waitOn: function(){
    return Meteor.subscribe("posts");
  }
  
});

Router.route("/", function() {
  if (this.ready()){
    this.render("postsList");
  }

  else {
    this.render("loading")
  }
});

Router.route("/posts/:_id", function() {

  this.render("postPage", { 
    data: function() {
      return Posts.findOne({_id: this.params._id});
    }
  }); 
});