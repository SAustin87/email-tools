let fs = require('fs');
let components = fs.readFileSync('../componentModules.txt').toString().replace(/\r\n/g,'\n').split('\n')
let layout = fs.readFileSync('../layoutModules.txt').toString().replace(/\r\n/g,'\n').split('\n')
let files = {
  layoutModules: [],
  componentModules: []
}

for(i in components) {
    console.log(components[i])
    files.componentModules.push(components[i])
}

for(i in layout) {
    console.log(layout[i])
    files.layoutModules.push(layout[i])
}
