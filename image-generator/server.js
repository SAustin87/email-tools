const express = require('express')
const { registerFont, createCanvas, loadImage } = require('canvas')
const app = express()
const port = 3000

// We need to register our font file to be used in canvas
registerFont('./fonts/hxbold.otf', { family: 'holiday extras' })

app.get('/header', (req, res) => {

    // Grab first name from query
    let firstname = decodeURI(req.query.name) ;
    let imgName = decodeURI(req.query.image) ;
    let y = decodeURI(req.query.y) ;
    let x = decodeURI(req.query.x) ;

    // Define the canvas
    const width = 600 // width of the image
    const height = 200 // height of the image
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    // Define the font style
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.fillStyle = '#FFFFFF'
    context.font = "70px 'holiday extras' bold";

    // Load and draw the background image first
    loadImage('./images/' + imgName + '.jpg').then(image => {

        // Draw the background
        context.drawImage(image, 0, 0, 600, 200)

        // Draw the text
        context.fillText(firstname, x, y)

        // Convert the Canvas to a buffer
        const buffer = canvas.toBuffer('image/png')

        // Set and send the response as a PNG
        res.set({ 'Content-Type': 'image/png' });
        res.send(buffer)
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))