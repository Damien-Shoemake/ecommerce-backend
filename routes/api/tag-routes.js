const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      attributes: ["id", "tag_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.json(tags);
  } catch (e) {
    res.status(500).json({ message: `Server Error: ${e}` });
  }
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "tag_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    if (!tag) {
      res.status(404).json({ message: "No tag with this id found!" });
      return;
    } else {
      res.json(tag);
    }
  } catch (e) {
    res.status(500).json({ message: `Server Error: ${e}` });
  }
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(newTag);
  } catch (e) {
    res.status(500).json({ message: `Server Error: ${e}` });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateTag) {
      res.status(404).json({ message: "No tag with this id found!" });
      return;
    } else {
      res.json(updateTag);
    }
  } catch (e) {
    res.status(500).json({ message: `Server Error: ${e}` });
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ message: "No tag with this id found!" });
      return;
    } else {
      res.json(deleteTag);
    }
  } catch (e) {
    res.status(500).json({ message: `Server Error: ${e}` });
  }
});

module.exports = router;
