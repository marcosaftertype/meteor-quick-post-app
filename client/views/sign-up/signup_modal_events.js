Template.signupModal.events({
	'click #signup-modal .close-modal': function(ev){
		let modal = ev.target.parentNode
		ModalApply.hide(modal, 'modal-card')
	},

	'submit #signup-modal form': function(ev){
		ev.preventDefault()

		let form 			= ev.target
		let modal 			= form.parentNode
		let errored 		= form.querySelectorAll('.error')
		let nameInput 		= form.querySelector('[name="name"]')
		let usernameInput 	= form.querySelector('[name="username"]')
		let emailInput 		= form.querySelector('[name="email"]')
		let passwordInput 	= form.querySelector('[name="password"]')
		let cPasswordInput 	= form.querySelector('[name="confirm-password"]')
		let nameValue 		= nameInput.value.trim()
		let usernameValue 	= usernameInput.value.trim()
		let emailValue 		= emailInput.value.trim()
		let passwordValue 	= passwordInput.value.trim()
		let cPasswordValue 	= cPasswordInput.value.trim()

		// clean errors
		if (errored.length) {
			for (let i = 0; i < errored.length; i++) {
				errored[i].classList.remove('error')
			}
		}

		if (!nameValue) 
			return $(nameInput).velocity('callout.shake').addClass('error')

		if (!usernameValue) 
			return $(usernameInput).velocity('callout.shake').addClass('error')

		if (!validator.isEmail(emailValue)) 
			return $(emailInput).velocity('callout.shake').addClass('error')

		if (!passwordValue)
			return $(passwordInput).velocity('callout.shake').addClass('error')

		if (!cPasswordValue)
			return $(cPasswordInput).velocity('callout.shake').addClass('error')

		if (passwordValue != cPasswordValue) {	
			$(passwordInput).velocity('callout.shake').addClass('error')
			return $(cPasswordInput).velocity('callout.shake').addClass('error')
		}

		Accounts.createUser({
			email: emailValue, 
			password : passwordValue,
			profile: {
				username: usernameValue,
				name: nameValue,
				avatar: Gravatar.imageUrl(emailValue, {secure: true, size: 200, default: 'identicon'})
			}
		}, err => {
			if (err)
				return console.log(err)

			ModalApply.hide(modal, 'modal-card')
		})
	}
})