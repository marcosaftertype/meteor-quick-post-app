Template.postPage.helpers({
	voteLabel() {
		let user = Meteor.user()

		if (!user) 
			return 'Vote'

		return this.post.stats.votes.users.indexOf(user._id) > -1 ? 'You voted this' : 'Vote'
	},

	canEdit() {
		let user = Meteor.user()

		if (!user) 
			return false

		return this.post.author.id === user._id
	}
})