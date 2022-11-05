const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const allCat = await Category.findAll({
    include: {model: Product}
  });
  return res.json(allCat);
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const oneCat = await Category.findByPk(req.params.id, {
    include: {model: Product}
  });
  // be sure to include its associated Products
  return res.json(oneCat);
});

router.post('/new', async (req, res) => {
  // create a new category
  const newCat = await Category.create(req.body);
  res.json(newCat);
});

router.put('/update/:id', async (req, res) => {
  // update a category by its `id` value
  const updateCat = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.json(updateCat);
});

router.delete('/delete/:id', async (req, res) => {
  // delete a category by its `id` value
  const delCat = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(delCat);
});

module.exports = router;
