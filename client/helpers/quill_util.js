QuillUtil = {
	editor: {}, // {el, instance}

	toolbar(type = 'extended'){
		let toolbar = [
			[ 'bold', 'italic' ], 
			[
				{ 'list': 'ordered'}, 
				{ 'list': 'bullet' }, 
				'link'
			]
		]

		if (type == 'extended')
			toolbar.push(['blockquote', 'code-block'])

		return toolbar
	}, 

	setEditor(options, newReset) {
		let {onElement, toolbarType, placeholder} = options
		let toolbar = this.toolbar(toolbarType)

		if (!onElement) 
			return console.error('DOM Element missing on options for setEditor')

		if (!placeholder)
			placeholder = 'Write your content...'

		// reset QuillUtil
		this.reset(newReset)

		// set Editor
		this.editor.el 			= onElement
		this.editor.instance 	= new Quill(onElement, {
			modules: {
				toolbar
			},
			placeholder: placeholder,
			theme: 'snow'
		})
	},

	reset(){
		this.editor = {}
	}
}