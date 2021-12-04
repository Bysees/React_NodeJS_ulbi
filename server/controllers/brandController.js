const { Brand } = require('../models/models')

class BrandController {
  async create(req, res) {
    setTimeout(async () => {
      const { name } = req.body

      const isBrandExist = await Brand.findOne({ where: { name } })
      if (isBrandExist) {
        return res.status(405).json({ message: 'Such a brand already exist' })
      }

      const brand = await Brand.create({ name })
      return res.json(brand)
    }, 1000)
  }
  async getAll(req, res) {
    const brands = await Brand.findAll()
    return res.json(brands)
  }
}

module.exports = new BrandController()
