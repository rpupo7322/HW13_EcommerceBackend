const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const cat = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const cat = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    res.status(200).json(cat)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  console.log('req:', req.body)
  await Category.create(req.body)
  res.status(200).json(req.body)
} catch (err) {
      console.log(err);
    res.status(400).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  console.log('req:', req.body)
  
  await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  const newCat = await Category.findByPk(req.params.id) 
  res.status(200).json({message: 'category updated', newCat})
} catch (err) {
  console.log(err);
  res.status(400).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const cat = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!cat) {
      res.status(404).json({ message: 'No category with the input id' });
      return;
    }
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
