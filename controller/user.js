const model = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "booking-wisata";
const controller = {};
const { uid } = require("uid");

// get all data
controller.getAll = async (req, res) => {
  try {
    await model.user.findAll().then((result) => {
      if (result.length > 0) {
        res.status(200).json({
          message: "get all data success",
          status: 200,
          data: result,
        });
      } else {
        res.status(404).json({
          message: "data not found",
          status: 404,
          data: [],
        });
      }
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: 404,
      data: [],
    });
  }
};

// get data by id
controller.getById = async (req, res) => {
  try {
    await model.user
      .findOne({
        where: {
          uid: req.params.id,
        },
      })
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: "get data by id success",
            status: 200,
            data: result,
          });
        } else {
          res.status(404).json({
            message: "data not found",
            status: 404,
            data: [],
          });
        }
      });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: 404,
      data: [],
    });
  }
};

// register
controller.register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    await model.user
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((result) => {
        if (result) {
          res.status(400).json({
            message: "email sudah terdaftar",
            status: 400,
          });
        } else {
          model.user
            .create({
              nama: req.body.nama,
              email: req.body.email,
              uid: uid(),
              password: hash,
              createdAt: new Date().getTime(),
              updatedAt: new Date().getTime(),
            })
            .then((result) => {
              res.status(200).json({
                message: "register berhasil",
                status: 200,
                data: result,
              });
            });
        }
      });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: 400,
      data: [],
    });
  }
};

// login
controller.login = async (req, res) => {
  try {
    await model.user
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then(async (result) => {
        if (result) {
          const validPassword = await bcrypt.compare(
            req.body.password,
            result.password
          );
          if (validPassword) {
            const token = jwt.sign(
              {
                id: result.id,
                uid: result.uid,
                nama: result.nama,
                email: result.email,
              },
              SECRET_KEY,
              {
                expiresIn: "24h",
              }
            );
            res.status(200).json({
              message: "login berhasil",
              status: 200,
              data: result,
              token: token,
            });
          } else {
            res.status(400).json({
              message: "password salah",
              status: 400,
            });
          }
        } else {
          res.status(404).json({
            message: "email tidak terdaftar",
            status: 400,
          });
        }
      });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: 400,
      data: [],
    });
  }
};

// update
controller.update = async (req, res) => {
  const data = {
    nama: req.body.nama,
    email: req.body.email,
    password: req.body.password,
    updatedAt: new Date().getTime(),
  };
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      data.password = hash;
    }
    await model.user
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result) {
          if (data.email) {
            model.user
              .findOne({
                where: {
                  email: req.body.email,
                },
              })
              .then((result) => {
                if (result) {
                  res.status(400).json({
                    message: "email sudah terdaftar",
                    status: 400,
                  });
                } else {
                  model.user
                    .update(data, {
                      where: {
                        id: req.params.id,
                      },
                    })
                    .then((result) => {
                      res.status(200).json({
                        message: "berhasil update data",
                        status: 200,
                        data: result,
                      });
                    });
                }
              });
          } else {
            model.user
              .update(data, {
                where: {
                  id: req.params.id,
                },
              })
              .then((result) => {
                res.status(200).json({
                  message: "berhasil update data",
                  status: 200,
                  data: result,
                });
              });
          }
        } else {
          res.status(404).json({
            message: "data not found",
            status: 404,
            data: [],
          });
        }
      });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: 400,
      data: [],
    });
  }
};

// delete
controller.delete = async (req, res) => {
  try {
    await model.user
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result) {
          model.user
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then((result) => {
              res.status(200).json({
                message: "berhasil hapus data",
                status: 200,
                data: result,
              });
            });
        } else {
          res.status(404).json({
            message: "data not found",
            status: 404,
            data: [],
          });
        }
      });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: 400,
      data: [],
    });
  }
};

module.exports = controller;
