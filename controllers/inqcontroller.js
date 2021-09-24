const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { models } = require("../models");

// Send an inquiry
router.post("/sendInq", validateJWT, async (req, res) => {
  const { fullName, email, phoneNumber, car, message } = req.body.inq;

  try {
    await models.InqModel.create({
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      car: car,
      message: message,
      userId: req.user.id,
    }).then((inq) => {
      res.status(201).json({
        inq: inq,
        message: "Congrats! Inquiry has been sent to Griz Auto Detailing",
      });
    });
  } catch (err) {
    res.status(500).json({
      error: `Oh no! Failed to send an inquiry. Error: ${err}`,
    });
  }
});

// View YOUR OWN inquiries
router.get("/viewInq", validateJWT, async (req, res) => {
  let { id } = req.user;

  try {
    const userInq = await models.InqModel.findAll({
      where: {
        userId: id, // ***OWNER WAS HERE***
      },
    });
    res.status(200).json(userInq);
  } catch (err) {
    res.status(500).json({
      error: `Oh no! Failed to load your inquiries. Error: ${err}`,
    });
  }
});

// Update an inquiry
router.put("/updateInq/:id", validateJWT, async (req, res) => {
  const { fullName, email, phoneNumber, car, message } = req.body.inq;
  const inqId = req.params.id;
  const userId = req.user.id;

  const query = {
    where: {
      id: inqId,
      userId: userId, // ***OWNER WAS HERE***
    },
  };

  const updatedInq = {
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    car: car,
    message: message,
  };

  try {
    const update = await models.InqModel.update(updatedInq, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({
      error: `Oh no! Failed to update your inquiry. Error: ${err}`,
    });
  }
});

// Delete an inquiry
router.delete("/deleteInq/:id", validateJWT, async (req, res) => {
  const inqId = req.params.id;
  const userId = req.user.id;

  try {
    const query = {
      where: {
        id: inqId,
        userId: userId, // ***OWNER WAS HERE***
      },
    };
    await models.InqModel.destroy(query);
    res.status(200).json({
      message: "Inquiry has been deleted.",
    });
  } catch (err) {
    res.status(500).json({
      error: `Oh no! Failed to delete your inquiry. Error: ${err}`,
    });
  }
});

// View ALL inquiries -- **ADMIN ONLY**
router.get("/allInq", async (req, res) => {
  
  try {
    await models.UserModel.findOne({
      where: {
        isAdmin: true,
      },
    }).then((admin) => {
      if (admin) {
         models.InqModel.findAll()
        .then((allInquiries) => {res.status(200).json(allInquiries)});
      } else {
        res.status(401).json({
          message:
            "Sorry! This request lacks valid authentication credentials.",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      error: `Oh no! Failed to load all inquiries. Error: ${err}`,
    });
  }
});

module.exports = router;
