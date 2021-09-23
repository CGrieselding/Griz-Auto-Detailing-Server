const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { models } = require("../models");

// Post a review
router.post("/postRev", validateJWT, async (req, res) => {
  const { title, date, review, imageURL } = req.body.rev;

  try {
    await models.RevModel.create({
      title: title,
      date: date,
      review: review,
      imageURL: imageURL,
      userId: req.user.id,
    }).then((rev) => {
      res.status(201).json({
        rev: rev,
        message: "Congrats! Review created!",
      });
    });
  } catch (err) {
    res.status(500).json({
      error: `Oh no! Failed to create a review. Error: ${err}`,
    });
  }
});

// View all reviews
router.get("/viewRev", async (req, res) => {
  try {
    const allReviews = await models.RevModel.findAll();
    res.status(200).json(allReviews);
  } catch (err) {
    res.status(500).json({
      error: `Oh no! Failed to load all reviews. Error: ${err}`,
    });
  }
});

// Update a review
router.put("/updateRev/:id", validateJWT, async (req, res) => {
  const { title, date, review, imageURL } = req.body.rev;
  const revId = req.params.id;
  const userId = req.user.id;

  const query = {
    where: {
      id: revId,
      userId: userId, // ***OWNER WAS HERE***
    },
  };

  const updatedRev = {
    title: title,
    date: date,
    review: review,
    imageURL: imageURL,
  };

  try {
    const update = await models.RevModel.update(updatedRev, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({
      error: `Oh no! Failed to update your review. Error: ${err}`,
    });
  }
});

// Delete a review
router.delete("/deleteRev/:id", validateJWT, async (req, res) => {
  const revId = req.params.id;
  const userId = req.user.id;

  try {
    const query = {
      where: {
        id: revId,
        userId: userId, // ***OWNER WAS HERE***
      },
    };
    await models.RevModel.destroy(query);
    res.status(200).json({
      message: "Review has been deleted.",
    });
  } catch (err) {
    res.status(500).json({
      error: `Oh no! Failed to delete your review. Error: ${err}`,
    });
  }
});

/* Delete a users review -- **ADMIN ONLY** 

          ADD CODE??

*/

module.exports = router;
