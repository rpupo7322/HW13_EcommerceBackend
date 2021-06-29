const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll({
      include: [{model: Product, through: ProductTag}]
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}]
    });
    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    console.log('req:', req.body)
    await Tag.create(req.body)
    res.status(200).json(req.body)
  } catch (err) {
        console.log(err);
      res.status(400).json(err);
  }
  });

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    console.log('req:', req.body)
    
    await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    const newTag = await Category.findByPk(req.params.id) 
    res.status(200).json({message: 'tag updated', newTag})
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
  });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag with the input id' });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
