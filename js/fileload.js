

let folder1 = "/email-tools/contentSections/componentModules/"
let folder2 = "/email-tools/contentSections/layoutModules/"
let files = []
let fileNames = []

$.ajax({

async:false,
url : folder1,
success: function (data) {
	$(data).find("a:contains(.html)").each(function(){
		 // will loop through
		 let modules = $(this).attr("href").substring(13);

		 files.push(modules)

		 console.log(modules)

	});
	console.log(files)
}

});

$.ajax({
async:false,
url : folder2,
success: function (data) {
	$(data).find("a:contains(.html)").each(function(){
		 // will loop through
		 let modules = $(this).attr("href").substring(13);

		 files.push(modules)

		 console.log(modules)

	});
	console.log(files)
}

});

files = files.filter(function( element ) {
 return element !== undefined;
});

for (let i = 0; i < files.length; ++i) {
let splitNames = files[i].replace('.html', '').replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }).split('/').reverse()
fileNames.push(splitNames[0].substring(5))

$(function () {
	$.get(files[i], function (data) {
		if ( splitNames[1].replace(' ', '') === 'layoutModules') {
			let id = splitNames[0].substring(0,2)
		$('.layoutModules').append('<div id="' + id + '"><hr class="sectionRule"><h3>' + fileNames[i] + '</h3> <div>' + data + '</div></div>');
	}
		else if ( splitNames[1].replace(" ", '') === 'componentModules') {
			let id = splitNames[0].substring(0,2)
			$('.componentModules').append('<div id="' + id + '"><hr class="sectionRule"><h3>' + fileNames[i] + '</h3> <div>' + data + '</div></div>');
}
	});

});
}
