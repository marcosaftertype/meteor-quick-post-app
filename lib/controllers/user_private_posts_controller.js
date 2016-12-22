let UserPrivatePostsController = FeedController.extend({
	subscriptions(){
		this.cSubscription = Meteor.subscribe('userPrivatePostsFeed', this.pageLimit())
	},
	posts(){
		let userId = Meteor.userId()

		return Posts.find({
			'author.id': userId, 
			type: 'private'
		}, 
		{
			limit: this.pageLimit(), 
			sort: {created_at: -1}
		})
	},
	data(){
		return {
			posts: this.posts(),
			ready: this.cSubscription.ready
		}
	},
	onBeforeAction(){
		let user = Meteor.userId()

		if (!user) {
			Session.set('accessDeniedMsg', 'Access denied, create an account for more features')
			return Router.go('/')
		}

		this.next()
	}
})

ControllersLib.UserPrivatePostsController = UserPrivatePostsController