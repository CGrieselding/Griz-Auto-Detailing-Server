const router = require("express").Router();
const { models } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let validateJWT = require('../middleware/validate-jwt');
const { UniqueConstraintError } = require("sequelize/lib/errors");

// Create Account
router.post("/createAcct", async (req, res) => {
  const { firstName, lastName, email, password, isAdmin} = req.body.user;

  try {
    await models.UserModel.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
      isAdmin
    }).then((user) => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(201).json({
        user: user,
        message: "User created!",
        sessionToken: `Bearer ${token}`,
      });
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Sorry! This email is already in use.",
      });
    } else {
      res.status(500).json({
        error: `Whoops, something went wrong! Failed to register user. Error: ${err}`,
      });
    }
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body.user;

  try {
    await models.UserModel.findOne({
      where: {
        email: email,
      },
    }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              message: "Successful login!",
              sessionToken: `Bearer ${token}`,
            });
          } else {
            res.status(502).send({
              error: "Bad Gateway!",
            });
          }
        });
      } else {
        res.status(500).send({
          error: "Oh no! Failed to authenticate user!",
        });
      }
    });
  } catch (err) {
    res.status(501).send({
      error: "Sorry! The server does not support this functionality.",
    });
  }
});

// Allows users to see their activity (Database Association)
router.get("/myInfo", async (req, res) => {
  
  try {
    await models.UserModel.findAll({
      include: [
        {
          model: models.RevModel,
          model: models.InqModel,
        },
      ],
    }).then((users) => {
      res.status(200).json({
        users: users,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: `Sorry! Failed to retrieve user. Error: ${err}`,
    });
  }
});

// Delete user -- **ADMIN ONLY**
router.delete("/deleteUser/:id", validateJWT, async (req, res) => {
  const ownerId = req.user.id;

  try {
    const query = {
      where: {
        id: ownerId,    // ***OWNER WAS HERE***
        isAdmin: true,
      },
    };
    await models.UserModel.destroy(query);
    res.status(200).json({ message: "User has been deleted." });
  } catch (err) {
    res.status(500).json({ error: `Oh no! Failed to delete this user. Error: ${err}` });
  }
});

module.exports = router;
