function loadScript() {

	for (let x = 0; x < Object.keys(files).length; x++) {

	for (let i = 0; i < Object.values(files)[x].length; i++) {

		$(function () {
			let moduleType = Object.keys(files)[x]
			let moduleName = Object.values(files)[x][i]
			let moduleNameReplaceExt = moduleName.replace('.html', '')
			let moduleNameReplaceUnderscore = moduleNameReplaceExt.replace(/_/g, ' ')
			let moduleNameAddSpacing = moduleNameReplaceUnderscore.replace(/([A-Z])/g, ' $1')
			let moduleNameCapitalise = moduleNameAddSpacing.replace(/^./, function(str){ return str.toUpperCase(); })
			let moduleDisplayName = moduleNameCapitalise

			console.log(moduleName)

					$.get(path + moduleType + '/' + moduleName, function (data) {
					$('.' + moduleType).append('<div><h3>' + moduleNameCapitalise + '</h3> <div>' + data + '</div></div>');
				});

			let layoutModulesChildren = $('.layoutModules').children('div').eq(i)
			console.log(layoutModulesChildren)
			});
		}

}

}

loadScript()
