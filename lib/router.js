Router.configure({
  layoutTemplates: "layout",
  loadingTemplates: "loading"
});

Router.route('/', function() {
  this.subscribe('posts').wait();

  if (this.ready()){
    this.render('postsList');
  }

  else {
    this.render("loading")
  }
});

Router.route("/posts/:_id", function() {
  this.render("postItem", { 
    data: function() {
      return Posts.findOne({_id: this.params._id});
    }
  }); 
});