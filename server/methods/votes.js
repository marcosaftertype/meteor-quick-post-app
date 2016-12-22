Meteor.methods({
	votePost(data){
		check(data, {
			postId: String,
		})

		let { postId } 	= data
		let userId 		= Meteor.userId()
		let post 		= Posts.findOne(postId, {fields: {stats: 1}})

		let updateModifier = {
			$push: {
				'stats.votes.users': userId
			},
			$inc: {
				'stats.votes.count': 1
			}
		}

		if (post.stats.votes.users.indexOf(userId) > -1) {
			updateModifier = {
				$pull: {
					'stats.votes.users': userId
				},
				$inc: {
					'stats.votes.count': -1
				}
			}
		}

		Posts.update(postId, updateModifier)
	}
})