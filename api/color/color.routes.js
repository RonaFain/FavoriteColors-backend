const express = require('express')
const { getColors, updateColor } = require('./color.controller')
const router = express.Router()

router.get('/', getColors)
router.put('/', updateColor)

module.exports = router