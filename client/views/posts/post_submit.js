Template.postSubmit.events({
  'submit form':function(data){
    data.preventDefault();
  
    var post = {
      url: $(data.target).find("[name=url]").val(),
      title: $(data.target).find("[name=title]").val()
    }

    var errors = validatePost(post); 
      if(errors.title || errors.url)
        return Session.set('postSubmitErrors', errors);

    Meteor.call('postInsert', post, function(error, result) {
      if (error)
        return throwError(error.reason);
      if (result.postExists)
        throwError("This link has already been posted")
      Router.go('/', {_id: result._id});
    });
  }
});

Template.postSubmit.onCreated(function(){
  Session.set('postSubmitErrors', {});
}); 

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  }, 
  errorClass: function(field){
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});