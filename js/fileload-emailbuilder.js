function fileLoadScript() {

	var filesHtml = Object.assign({}, files)

  for (let x = 0; x < Object.keys(files).length; x++) {

	for (let i = 0; i < Object.values(files)[x].length; i++) {

		$(function () {

			console.log(filesHtml)
			let moduleType = Object.keys(files)[x]
			let moduleName = Object.values(files)[x][i]
			let moduleNameReplaceExt = moduleName.replace('.html', '')
			let moduleNameReplaceUnderscore = moduleNameReplaceExt.replace(/_/g, ' ')
			let moduleNameAddSpacing = moduleNameReplaceUnderscore.replace(/([A-Z])/g, ' $1')
			let moduleNameCapitalise = moduleNameAddSpacing.replace(/^./, function(str){ return str.toUpperCase(); })
			let moduleDisplayName = moduleNameCapitalise

					$.get(path + moduleType + '/' + moduleName, function (data) {

						//Object.values(filesHtml)[x][i] = '<div><h3>' + moduleNameCapitalise + '</h3> <div>' + data + '</div></div>';
					$('.' + moduleType).append('<div><h3>' + moduleNameCapitalise + '</h3> <div>' + data + '</div></div>');
					//console.log(filesHtml)
				});

			let layoutModulesChildren = $('.layoutModules').children('div').eq(i)
			});
		}

}

}

fileLoadScript()
