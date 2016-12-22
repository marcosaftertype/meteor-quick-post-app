//========================================
// CONFIGURE =============================
//========================================
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
})

//========================================
// ROUTES ================================
// Retrieved from config/routes_lib.js
//========================================

for (let [path, name, controller] of RoutesLib){
	Router.route(path, {
		name: name,
		controller: ControllersLib[controller]
	})
}
