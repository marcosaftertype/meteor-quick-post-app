ModalApply = {
	show(modalCont, type, callback){
		let screen 	= modalCont.querySelector('.modal-screen')
		let modalContent = modalCont.querySelector(`.${type}`)

		modalCont.style.display = 'block'
		$(screen).velocity({opacity: 1}, 300)
		$(modalContent).velocity('transition.slideDownIn', {
			duration: 300,
			complete(){
				if (callback)
					callback()
			}
		})
	},

	hide(modalCont, type, callback){
		let screen 	= modalCont.querySelector('.modal-screen')
		let modalContent = modalCont.querySelector(`.${type}`)

		$(screen).velocity({opacity: 0}, 300)
		$(modalContent).velocity('transition.slideUpOut', {
			duration: 300,
			complete(){
				modalCont.style.display = 'none'
				if (callback)
					callback()
			}
		})
	}
}