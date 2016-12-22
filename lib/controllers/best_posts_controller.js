let BestPostsController = FeedController.extend({
	subscriptions(){
		this.cSubscription = Meteor.subscribe('bestPostsFeed', this.pageLimit())
	},
	posts(){
		return Posts.find({}, {
			limit: this.pageLimit(),
			sort: {'stats.votes.count': -1, created_at: -1}
		})
	},
	data(){
		return {
			posts: this.posts(),
			ready: this.cSubscription.ready
		}
	}
})

ControllersLib.BestPostsController = BestPostsController