const fs = require('fs')
const gColors = require('../../data/color.json')
const utilService = require('../../services/util.service.js')

module.exports = {
    query,
    save
}

function query() {
    let colors = gColors.slice()
    return Promise.resolve(colors)
}

async function save(color) {
    if (color._id) {
        const idx = gColors.findIndex(currColor => currColor._id === color._id)
        gColors[idx] = color
    } else {
        color._id = utilService.makeId()
        gColors.push(color)
    }
    await _saveColorsToFile()
    return color
}

function _saveColorsToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/color.json', JSON.stringify(gColors, null, 2), (err) => {
            if (err) {
                console.log(err);
                reject('Cannot write to file')
            } else {
                console.log('Wrote Successfully!')
                resolve()
            }
        })
    })
}