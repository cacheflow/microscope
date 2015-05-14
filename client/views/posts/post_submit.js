Template.postSubmit.events({
  'submit form':function(data){
    data.preventDefault();
  
    var post = {
      url: $(data.target).find("[name=url]").val(),
      title: $(data.target).find("[name=title]").val(),
      message: $(data.target).find("[name=message]").val()
    }

    Meteor.call('post', post, function(error, id) {
      if (error)
        return alert(error.reason)

      Router.go('/', {_id: id});
    });
  }
});