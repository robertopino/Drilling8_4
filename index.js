const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const PORT = 5001;
const app = express();

// MIDDLEWARES
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.listen(PORT, () =>
  console.log(`🟢 Ejecutando el sevidor en el puerto ` + PORT)
);

app.post("/cargadearchivo", (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({
        status: false,
        message: "No se ha cargado el archivo, o este es nulo",
      });
    }

    let newFile = req.files.fileName;

    newFile.mv(`./files/${newFile.name}`, (err) => {
      if (err)
        return res.status(500).send({
          message: err,
        });
      return res.status(200).json({
        message: "Archivo Subido al Servidor",
      });
    });
  } catch (error) {
    res.status(500).send(err);
  }
});
