Template.postSubmit.helpers({
  'submit form':function(data){
    data.preventDefault();
  
  var post = {
    url: $(data.target).find("[name=url]").val();
    title: $(data.target).find("[name=title").val();
    message: $(data.target).find("[name=message]").val();
  }

  post._id = Posts.insert(post);
  Router.go('postPage', post);
  }
})