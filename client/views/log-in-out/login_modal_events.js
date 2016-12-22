Template.loginModal.events({
	'click #login-modal .close-modal': function(ev){
		let modal = ev.target.parentNode
		ModalApply.hide(modal, 'modal-card')
	},

	'submit #login-modal form': function(ev, template){
		ev.preventDefault()
		
		let form 			= ev.target
		let modal 			= form.parentNode
		let errored 		= form.querySelectorAll('.error')
		let emailInput 		= form.querySelector('[name="email"]')
		let passwordInput 	= form.querySelector('[name="password"]')
		let emailValue 		= emailInput.value.trim()
		let passwordValue 	= passwordInput.value.trim()

		// clean errors
		if (errored.length) {
			for (let i = 0; i < errored.length; i++) {
				errored[i].classList.remove('error')
			}
		}

		if (!validator.isEmail(emailValue)) 
			return $(emailInput).velocity('callout.shake').addClass('error')

		if (!passwordValue)
			return $(passwordInput).velocity('callout.shake').addClass('error')

		Meteor.loginWithPassword(emailValue, passwordValue, err => {
			if (err)
				return console.log(err)

			ModalApply.hide(modal, 'modal-card')
		})

	}
})