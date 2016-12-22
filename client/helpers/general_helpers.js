Template.registerHelper('humanDate', date => {
	return moment(date).fromNow()
})
