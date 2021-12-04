const { Type } = require('../models/models')

class TypeController {
  async create(req, res) {
    const { name } = req.body

    const isTypeExist = await Type.findOne({ where: { name } })
    if (isTypeExist) {
      return res.status(405).json({ message: 'Such a type is already exist' })
    }

    const type = await Type.create({ name })

    return res.json(type)
  }
  async getAll(req, res) {
    const type = await Type.findAll()
    return res.json(type)
  }
}

module.exports = new TypeController()
