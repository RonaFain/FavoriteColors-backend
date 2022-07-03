const fs = require('fs')
const gColors = require('../data/color.json')
const utilService = require('./util.service.js')

module.exports = {
    query,
    // getById,
    // remove,
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

// function remove(colorId) {
//     const idx = gColors.findIndex(color => color._id === colorId)
//     gColors.splice(idx, 1)
//     return _saveColorsToFile()
// }

// function getById(colorId) {
//     const color = gColors.find(color => color._id === colorId)
//     return Promise.resolve(color)
// }

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