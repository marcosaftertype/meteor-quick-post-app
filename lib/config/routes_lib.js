RoutesLib = [
	// ====================================================================================================
	// PATH											| NAME 						| CONTROLLER
	// ====================================================================================================
	['/',											'home',  					'HomeController'],
	['/post/:title_url_encoded',					'postPage',					'PublicSinglePostController'],
	['/post/private/:title_url_encoded',			'privatePostPage',			'PrivateSinglePostController'],
	['/posts/public',								'userPublicPosts',			'UserPublicPostsController'],
	['/posts/private',								'userPirvatePosts',			'UserPrivatePostsController'],
	['/posts/public/best',							'bestPosts',				'BestPostsController'],
	['/profile',									'userProfile',				'UserProfileController']
]