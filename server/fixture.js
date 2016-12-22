'use strict'

let fixturesDate = new Date()

Accounts.onCreateUser(function(options, user) {
	user.emails[0].verified = true

	user.profile 	= options.profile ? options.profile : {}
	user.join 		= fixturesDate

	return user
})

if (Meteor.users.find({}, {limit: 1}).count() === 0) {
	let initUsers = [
		{
			email: 'marcos@aftertype.com',
			password: 'Qwerty123',
			name: 'Marcos Navarro',
			username: 'HappyPanda'
		},
		{
			email: 'test@dummy.com',
			password: 'Qwerty123',
			name: 'John Doe',
			username: 'WildWalrus'
		}
	]

	initUsers.forEach(user => {
		let { email, password, name, username } = user
		Accounts.createUser({
			email,
			password,
			profile: {
				username,
				name,
				avatar: Gravatar.imageUrl(email, {secure: true, size: 200, default: 'identicon'}),
			}
		})
	})

	console.log('Insert default users')
}

if (Posts.find({}, {limit: 1}).count() === 0) {
	let author = Meteor.users.findOne()

	let initPosts = [
		{
			title: 'Dummy Post Example N.',
			title_url_encoded: 'dummy-post-example-n-',
			content: {
				quillDeltas: [ { insert: 'Ambitioni dedisse scripsisse iudicaretur. Curabitur est gravida et libero vitae dictum. Quae vero auctorem tractata ab fiducia dicuntur. Inmensae subtilitatis, obscuris et malesuada fames. Ab illo tempore, ab est sed immemorabili. Ullamco laboris nisi ut aliquid ex ea commodi consequat.\n' } ],
				text: 'Ambitioni dedisse scripsisse iudicaretur. Curabitur est gravida et libero vitae dictum. Quae vero auctorem tractata ab fiducia dicuntur. Inmensae subtilitatis, obscuris et malesuada fames. Ab illo tempore, ab est sed immemorabili. Ullamco laboris nisi ut aliquid ex ea commodi consequat.\n',
				html: '<p>Ambitioni dedisse scripsisse iudicaretur. Curabitur est gravida et libero vitae dictum. Quae vero auctorem tractata ab fiducia dicuntur. Inmensae subtilitatis, obscuris et malesuada fames. Ab illo tempore, ab est sed immemorabili. Ullamco laboris nisi ut aliquid ex ea commodi consequat.</p>'
			},
			type: 'public',
			stats: {
				comments: 0,
				votes: {
					users: [],
					count: 0
				}
			},
			author: {
				id: author._id,
				name: author.profile.name,
				avatar: author.profile.avatar
			},
			created_at: fixturesDate
		}
	]

	for (var i = 0; i < 9; i++) {
		let post = Object.assign({}, initPosts[0])
		post.title = post.title + i
		post.title_url_encoded = post.title_url_encoded + i
		post.stats.votes.count = i
		post.created_at = new Date(fixturesDate.getTime() - i*5*60000);
		Posts.insert(post)
	}

	console.log('Insert default posts')
}