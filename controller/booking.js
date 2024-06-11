const model = require("../models");
const controller = {};
const { uid } = require("uid");

// get all data
controller.getAll = async (req, res) => {
  try {
    await model.booking.findAll().then((result) => {
	res.status(200).json({
	  message: "get all data success",
	  status: 200,
	  data: result,
	});
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
    await model.booking
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

// create
controller.create = async (req, res) => {
  try {
    await model.booking
      .create({
        uid: uid(),
        nama: req.body.nama,
        email: req.body.email,
        telepon: req.body.telepon,
        tanggal_berkunjung: req.body.tanggal_berkunjung,
        jam_berkunjung: req.body.jam_berkunjung,
        jumlah_orang: req.body.jumlah_orang,
        category_dituju: req.body.category_dituju,
        object_dituju: req.body.object_dituju,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      })
      .then((result) => {
        res.status(200).json({
          message: "berhasil menambahkan booking",
          status: 200,
          data: result,
        });
      });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: 404,
      data: [],
    });
  }
};

// update
controller.update = async (req, res) => {
  const data = {
    nama: req.body.nama,
    email: req.body.email,
    telepon: req.body.telepon,
    tanggal_berkunjung: req.body.tanggal_berkunjung,
    jam_berkunjung: req.body.jam_berkunjung,
    jumlah_orang: req.body.jumlah_orang,
    category_dituju: req.body.category_dituju,
    object_dituju: req.body.object_dituju,
    updatedAt: new Date().getTime(),
  };
  try {
    await model.booking
      .findOne({
        where: {
          uid: req.params.id,
        },
      })
      .then((result) => {
        if (result) {
          model.booking
            .update(data, {
              where: {
                uid: req.params.id,
              },
            })
            .then((result) => {
              res.status(200).json({
                message: "berhasil update data",
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

// delete
controller.delete = async (req, res) => {
  try {
    await model.booking
      .findOne({
        where: {
          uid: req.params.id,
        },
      })
      .then((result) => {
        if (result) {
          model.booking
            .destroy({
              where: {
                uid: req.params.id,
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
