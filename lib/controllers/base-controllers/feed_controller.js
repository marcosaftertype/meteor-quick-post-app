FeedController = RouteController.extend({
	template: 'feed',
	pageSize: 5,
	pageLimit(){
		let page = this.params.query.page
		let limit = page ? (this.pageSize * page) : this.pageSize
		return limit
	}
})