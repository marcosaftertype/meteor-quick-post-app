Template.managePostModal.helpers({
	editorTitle(){
		let editing = Session.get('editingPost')

		return editing ? 'Editing Post' : 'Create your post!'
	}
})