let HomeController = FeedController.extend({
	subscriptions(){
		this.cSubscription = Meteor.subscribe('homeFeed', this.pageLimit())
	},
	posts(){
		return Posts.find({}, {
			limit: this.pageLimit(),
			sort: {created_at: -1}
		})
	},
	data(){
		return {
			posts: this.posts(),
			ready: this.cSubscription.ready
		}
	}
})

ControllersLib.HomeController = HomeController