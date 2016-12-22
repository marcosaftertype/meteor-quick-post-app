Template.managePostModal.events({
	'click #manage-post-modal .close-modal': function(ev){
		let modal = ev.target.parentNode
		ModalApply.hide(modal, 's-modal', () => {
			modal.querySelector('.quill-wrap').innerHTML = '<div class="editor"></div>'
		})
	},

	'submit #manage-post-modal form': function(ev){
		ev.preventDefault()

		let form 			= ev.target
		let titleInput 		= form.querySelector('[name="title"]')
		let privateInput 	= form.querySelector('[name="is-private"]')
		let titleValue 		= titleInput.value
		let privateValue 	= privateInput.checked
		let quillInstance 	= QuillUtil.editor.instance
		let postCallType 	= Session.get('editingPost') ? 'editPost' : 'addNewPost'

		let data = {}

		$(titleInput).removeClass('error')

		if (!titleValue)
			return $(titleInput).velocity('callout.shake').addClass('error')

		if (quillInstance.getText().trim().length === 0)
			return $(QuillUtil.editor.el).velocity('callout.shake')

		data.title 			= titleValue
		data.isPrivate 		= privateValue
		data.quillDeltas 	= quillInstance.getContents().ops
		data.quillPlainText = quillInstance.getText()
		data.quillHtml		= quillInstance.container.firstChild.innerHTML

		if (Session.get('editingPost'))
			data.postId = Session.get('editingPost')

		Meteor.call(postCallType, data, (err, go) => {
			if (err)
				return console.log(err)

			let modal = form.parentNode
			ModalApply.hide(modal, 's-modal', () => {
				modal.querySelector('.quill-wrap').innerHTML = '<div class="editor"></div>'
			})

			if (go)
				Router.go(go)
		})
	}
})