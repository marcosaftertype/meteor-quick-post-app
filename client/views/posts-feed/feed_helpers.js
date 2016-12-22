Template.feed.helpers({
	noPosts(){
		return this.posts.count() === 0
	},

	nextPageQuery(){
		let pageParam 		= Router.current().params.query.page
		let currentPage 	= pageParam ? pageParam : 1
		let nextPage 		= ++currentPage

		return '?page='+nextPage
	},

	keepPaging(){
		let pageParam 		= Router.current().params.query.page
		let currentPage 	= pageParam ? pageParam : 1
		let totalAtPage 	= currentPage * 5
		let postsCount 		= this.posts.fetch().length
		
		if (totalAtPage === postsCount)
			return true

		return false
	}
})