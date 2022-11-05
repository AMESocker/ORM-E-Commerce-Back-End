const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const allTags = await Tag.findAll({
    include: {model: Product}
  });
  return res.json(allTags);
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const oneTag = await Tag.findByPk(req.params.id,{
    include: {model: Product}
  })
  // be sure to include its associated Product data
  return res.json(oneTag);
});

router.post('/new', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body);
  res.json(newTag);
});

router.put('update/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.json(updateTag);
});

router.delete('delete/:id', async (req, res) => {
  // delete on tag by its `id` value
  const delTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(delTag);
});

module.exports = router;
