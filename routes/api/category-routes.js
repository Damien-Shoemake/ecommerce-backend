const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })
    res.json(categories)
  } catch(e) {
    res.status(500).json({message: 'Server error'})
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const catId = await Category.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });

    if(!catId) {
      res.status(404).json({message: 'No category with this id found!'});
      return;
    }else {
      res.json(catId)
    }
  } catch (e){
    res.status(500).json({message: 'Server error'})
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(newCategory);
  } catch(e) {
    res.status(500).json({message: 'Server Error'})
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({
      where: {
        id: req.params.id,
      }
    });
    if (!updateCategory) {
      res.status(404).json({message: 'No category with this id found!'})
      return;
    } else {
      res.json(updateCategory)
    }
  } catch (e) {
    res.status(500).json({message: 'Server Error'})
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!deleteCategory) {
      res.status(404).json({message: 'No category with this id found!'})
      return;
    }else {
      res.json(deleteCategory)
    }
  } catch(e) {
    res.status(500).json({message: 'Server Error'})
  }
});

module.exports = router;
