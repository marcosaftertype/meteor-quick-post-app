Meteor.publish('homeFeed', limit => {
	return Posts.find({type: 'public'}, {limit: limit, sort: {created_at: -1}})
})

Meteor.publish('bestPostsFeed', limit => {
	return Posts.find({type: 'public'}, {limit: limit, sort: {'stats.votes.count': -1, created_at: -1}})
})

Meteor.publish('userPublicPostsFeed', function(limit) {
	let userId = this.userId
	return Posts.find({'author.id': userId, type: 'public'}, {limit: limit, sort: {created_at: -1}})
})

Meteor.publish('userPrivatePostsFeed', function(limit) {
	let userId = this.userId
	return Posts.find({'author.id': userId, type: 'private'}, {limit: limit, sort: {created_at: -1}})
})

Meteor.publish('publicPost', title_url_encoded => {
	return Posts.find({title_url_encoded, type: 'public'}, {limit: 1})
})

Meteor.publish('privatePost', function(title_url_encoded) {
	let userId = this.userId
	return Posts.find({'author.id': userId, title_url_encoded, type: 'private'}, {limit: 1})
})