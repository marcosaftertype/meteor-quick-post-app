Template.postPage.events({
	'click .edit-post': function(ev, template){
		ev.preventDefault()

		let modal 	= document.querySelector('#manage-post-modal')
		let editor 	= modal.querySelector('.editor')
		let post 	= template.data.post

		Session.set('editingPost', post._id)

		QuillUtil.setEditor({
			onElement: editor,
			placeholder: 'Write your content...'
		})

		let form 			= document.querySelector('#manage-post-modal form')
		let titleInput 		= form.querySelector('[name="title"]')
		let privateInput 	= form.querySelector('[name="is-private"]')
		
		titleInput.value		= post.title
		privateInput.checked	= post.type === 'private'

		QuillUtil.editor.instance.container.firstChild.innerHTML = post.content.html

		ModalApply.show(modal, 's-modal')
	},

	'click .delete-post': function(ev, template){
		ev.preventDefault()

		let userConfirm = confirm('Do you really want to delete your post?');

		if (!userConfirm)
			return

		Meteor.call('deletePost', {postId: template.data.post._id}, err => {
			if (err) 
				return console.log(err)

			Router.go('/')
		})
	},

	'click .vote-post': function(ev, template){
		ev.preventDefault()

		let user = Meteor.user()

		if (!user) return

		Meteor.call('votePost', {postId: template.data.post._id}, err => {
			if (err) 
				return console.log(err)
		})
	}
})