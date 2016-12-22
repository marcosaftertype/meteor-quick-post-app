let PublicSinglePostController = RouteController.extend({
	template: 'postPage',
	waitOn(){
		return Meteor.subscribe('publicPost', this.params.title_url_encoded)
	},
	data(){
		return {
			post: Posts.findOne({
				title_url_encoded: this.params.title_url_encoded, 
				type: 'public'
			})
		}
	}
})

ControllersLib.PublicSinglePostController = PublicSinglePostController