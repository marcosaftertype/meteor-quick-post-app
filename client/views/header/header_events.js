Template.header.events({
	'click .call-login': function(ev){
		ev.preventDefault()

		let modal = document.querySelector('#login-modal')
		ModalApply.show(modal, 'modal-card')

	},

	'click .call-signup': function(ev){
		ev.preventDefault()

		let modal = document.querySelector('#signup-modal')
		ModalApply.show(modal, 'modal-card')
	},

	'click .call-logout': function(ev){
		Meteor.logout(err => {
			if (err) 
				return console.log(err)

			Router.go('/')
		})
	},

	'click .call-posteditor': function(ev){
		let modal = document.querySelector('#manage-post-modal')
		let editor = modal.querySelector('.editor')

		Session.set('editingPost', false)

		QuillUtil.setEditor({
			onElement: editor,
			placeholder: 'Write your content...'
		})

		ModalApply.show(modal, 's-modal')
	}
})