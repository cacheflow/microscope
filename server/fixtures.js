if (Posts.find().count() === 0) {
    var now = new Date().getTime();

    var tomId = Meteor.users.insert({
        profile: {name: "Tom Coleman"}
    });

    var tom = Meteor.users.findOne(tomId); 

    var sachaId = Meteor.users.insert({
        profile: {name: "Sacha Greif"}
    });

    var sacha = Meteor.users.findOne(sachaId);

    var telescopeId = Posts.insert({
        title: "Introducing Telescope", 
        userId: sacha._id,
        author: sacha.profile.name, 
        url: "http://sachagrief.com/introducing-telescope",
        subitted: new Date(now - 7 * 3600 * 1000)
    }); 

    Comments.insert({
        postId: telescopeId, 
        userId: tom._id, 
        author: tom.profile.name, 
        submitted: new Date(now - 3 * 3600 * 1000),
        body: "You sure can tom!"
    });

    Comments.insert({
      postId: telescopeid, 
      userId: tom._id, 
      author: tom.profile.name, 
      submitted: new Date(now -5 * 7777 * 2222), 
      body: "WOOOO PROUD OF YOU"
    })

    Posts.insert({
        title: 'Meteor', 
        userId: tom._id, 
        author: tom.profile.name,
        url: "http://meteor.com", 
        submitted: new Date(now - 10 * 3600 * 1000)
    });

    Posts.insert({
      title: "The Meteor Book",
      userId: tom._id,
      author: tom.profile.name, 
      url: "http://themeteorbook.com",
      submitted: new Date(now - 12 * 3600 * 1000)
    });

}