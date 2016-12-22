let PrivateSinglePostController = RouteController.extend({
	template: 'postPage',
	waitOn(){
		return Meteor.subscribe('privatePost', this.params.title_url_encoded)
	},
	data(){
		return {
			post: Posts.findOne({
				title_url_encoded: this.params.title_url_encoded, 
				type: 'private'
			})
		}
	},
	onBeforeAction(){
		let user = Meteor.user()

		if (!user) {
			Session.set('accessDeniedMsg', 'Access denied, create an account for more features')
			return Router.go('/')
		}

		let post = Posts.findOne({title_url_encoded: this.params.title_url_encoded, type: 'private'})

		if (!post) 
			return Router.go('/')

		this.next()
	}
})

ControllersLib.PrivateSinglePostController = PrivateSinglePostController