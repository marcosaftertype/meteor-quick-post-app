let UserPublicPostsController = FeedController.extend({
	subscriptions(){
		this.cSubscription = Meteor.subscribe('userPublicPostsFeed', this.pageLimit())
	},
	posts(){
		let userId = Meteor.userId()

		return Posts.find({
			'author.id': userId, 
			type: 'public'
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

ControllersLib.UserPublicPostsController = UserPublicPostsController