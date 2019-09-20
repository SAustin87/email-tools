
let path = '/email-tools/contentSections/'
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

let x
let y

for (x of Object.keys(files)) {

	for (y of Object.values(files)) {

		$(function () {
					$.get(path + Object.keys(files)[x] + '/' + Object.values(files)[x][y], function (data) {
					$('.' + Object.keys(files)[x]).append('<div><h3>' + Object.values(files)[x][y].replace('.html', '').replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }) + '</h3> <div>' + data + '</div></div>');

				});

			});
		}

}
