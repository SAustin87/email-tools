
let path = '/contentSections/'
let files =
	{
		componentModules : [
			'fullWidthImage.html',
			'paragraphTextBox.html',
			'buttonStack.html',
			'linkList.html',
			'freeCancellationBanner.html',
			'shareLink_-_CentreAligned.html',
			'shareLink_-_LeftAligned.html',
			'feedbackScale.html',
			'promotionalFooter.html',
			'transactionalFooter.html',
			'termsAndConditions.html',
			'spacer.html',
			'appButtons.html'
		],
		layoutModules : [
			'brandTagHeader.html',
			'leftAligned_-_TextOnly.html',
			'centreAligned_-_TextOnly.html',
			'centreAligned_-_TextAndImage.html',
			'fullWidthBackground.html',
			'twoColumnTextAndImage.html',
			'twoColumnImageAndText.html',
			'twoColumnSmallImageAndText.html',
			'twoColumnTextAndSmallImage.html',
			'twoColumn_-_TwoProduct.html',
			'threeColumn.html'
		]
}


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

					$.get(path + moduleType + '/' + moduleName, function (data) {
					$('.' + moduleType).append('<div><h3>' + moduleNameCapitalise + '</h3> <div>' + data + '</div></div>');
				});

			});
		}

}
