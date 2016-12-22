Meteor.methods({
	addNewPost(data){
		check(data, { 
			title: String,
			isPrivate: Boolean,
			quillDeltas: Array, 
			quillPlainText: String, 
			quillHtml: String
		})

		let user = Meteor.user()

		if (!user) 
			return 'Not logged in'

		let {
			title,
			isPrivate,
			quillDeltas,
			quillPlainText,
			quillHtml
		} = data

		let title_url_encoded = title.toLowerCase()
		title_url_encoded = title_url_encoded.replace(/ /g, '-')
		title_url_encoded = encodeURIComponent(title_url_encoded)

		let post = Posts.insert({
			title,
			title_url_encoded,
			content: {
				quillDeltas,
				text: quillPlainText,
				html: quillHtml
			},
			type: isPrivate ? 'private' : 'public',
			stats: {
				comments: 0,
				votes: {
					users: [],
					count: 0
				}
			},
			author: {
				id: user._id,
				name: user.profile.name,
				avatar: user.profile.avatar
			},
			created_at: new Date()
		})

		return post ? `/post/${isPrivate ? 'private/' : ''}${title_url_encoded}` : false
	},

	editPost(data){
		check(data, { 
			postId: String,
			title: String,
			isPrivate: Boolean,
			quillDeltas: Array, 
			quillPlainText: String, 
			quillHtml: String
		})

		let userId = Meteor.userId()

		if (!userId) 
			return 'Not logged in'

		let {
			postId,
			title,
			isPrivate,
			quillDeltas,
			quillPlainText,
			quillHtml
		} = data

		let title_url_encoded = title.toLowerCase()
		title_url_encoded = title_url_encoded.replace(/ /g, '-')
		title_url_encoded = encodeURIComponent(title_url_encoded)

		let post = Posts.update({_id: postId, 'author.id': userId}, {
			$set: {
				title,
				title_url_encoded,
				content: {
					quillDeltas,
					text: quillPlainText,
					html: quillHtml
				},
				type: isPrivate ? 'private' : 'public',
				updated_at: new Date()
			}
		})

		return post ? `/post/${isPrivate ? 'private' : ''}/${title_url_encoded}` : false
	},

	deletePost(data){
		check(data, {
			postId: String,
		})

		let { postId } 	= data
		let userId 		= Meteor.userId()

		if (!userId) 
			return 'Not logged in'
		
		let result = Posts.remove({_id: postId, 'author.id': userId})

		return result
	},

	setPostPrivate(data){

	},

	setPostPublic(data){

	}

})