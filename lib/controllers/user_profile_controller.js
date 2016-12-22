let UserProfileController = RouteController.extend({
	onBeforeAction(){
		let userId = Meteor.userId()

		if (!userId) {
			Session.set('accessDeniedMsg', 'You need to create an account')
			return Router.go('/')
		}

		this.next()
	}
})

ControllersLib.UserProfileController = UserProfileController