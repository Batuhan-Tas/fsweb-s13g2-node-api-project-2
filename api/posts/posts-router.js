// posts için gerekli routerları buraya yazın

const router = require("express").Router();

const postsModel = require("./posts-model");

router.get("/", async (req, res) => {
  let getPosts = await postsModel.find();

  if (getPosts) {
    res.json(getPosts);
  } else {
    res.status(500).json({ message: "Gönderiler alınamadı" });
  }
});

router.get("/:id", async (req, res) => {
  let getId = await postsModel.findById(req.params.id);

  if (getId) {
    res.json(getId);
  } else if (!getId) {
    res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
  } else {
    res.status(500).json({ message: "Gönderi bilgisi alınamadı" });
  }
});

router.post("/", async (req, res) => {
  let { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Lütfen gönderi için bir title ve contents sağlayın" });
  } else if (title && contents) {
    let postPosts = await postsModel.insert({ title, contents });
    let insertedPosts = await postsModel.findById(postPosts.id);
    res.status(201).json(insertedPosts);
  } else {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});

router.put("/:id", async (req, res) => {
  let { title, contents } = req.body;
  let getId = await postsModel.findById(req.params.id);
  if (getId) {
    if (!title || !contents) {
      res
        .status(400)
        .json({ message: "Lütfen gönderi için title ve contents sağlayın" });
    } else {
      let updatePosts = await postsModel.update(req.params.id, {
        title,
        contents,
      });
      let updatedPosts = await postsModel.findById(req.params.id);
      res.status(200).json(updatedPosts);
    }
  } else if (!getId) {
    res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
  } else {
    res.status(500).json({ message: "Gönderi bilgileri güncellenemedi" });
  }
});

router.delete("/:id", async (req, res) => {
  let { title, contents } = req.body;
  let getId = await postsModel.findById(req.params.id);
  if (getId) {
    let deletedPost = await postsModel.findById(req.params.id);
    let deletePost = await postsModel.remove(req.params.id);
    res.json(deletedPost);
  } else if (!getId) {
    res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
  } else {
    res.status(500).json({ message: "Gönderi bilgileri güncellenemedi" });
  }
});

router.get("/:id/comments", async (req, res) => {
  let getId = await postsModel.findById(req.params.id);
  if (getId) {
    let getComments = await postsModel.findPostComments(req.params.id);
    res.json(getComments);
  } else if (!getId) {
    res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
  } else {
    res.status(500).json({ message: "Gönderi bilgileri güncellenemedi" });
  }
});

module.exports = router;
