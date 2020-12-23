const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Jobs = require("../models/jobs");

// Para poder usar el operador like y buscar por keywords
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// List all jobs

router.get("/", (req, res, next) => {
  Jobs.findAll()
    .then((Jobs) => {
      res.render("jobs", { Jobs });
    })
    .catch((error) => console.log(`Error: ${error}`));
});

// Display add a job form
router.get("/add", (req, res) => res.render("jobsAdd"));

// Add a job
router.post("/add", (req, res, next) => {
  let {
    title,
    technologies,
    budget,
    experience,
    description,
    contact_email,
  } = req.body;
  let errors = [];

  // Validation
  if (!title) {
    errors.push({ text: "El campo del titulo no puede estar vacio" });
  }
  if (!technologies) {
    errors.push({ text: "El campo de las tecnologias no puede estar vacio" });
  }
  // if (isNaN(budget)) {
  //   errors.push({
  //     text: "Por favor complete el campo de presupuesto con numeros",
  //   });
  // }
  // if (!experience) {
  //   errors.push({
  //     text:
  //       "Por favor seleccione el tipo de experiencia requerida para el trabajo",
  //   });
  // }
  if (!description) {
    errors.push({ text: "El campo de la descripcion no puede estar vacio" });
  }
  if (!contact_email) {
    errors.push({
      text: "El campo del email de contacto no puede estar vacio",
    });
  }

  if (errors.lenght > 0) {
    console.log(errors);
    res.render("jobsAdd", {
      errors,
      title,
      technologies,
      budget,
      experience,
      description,
      contact_email,
    });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render("jobsAdd", {
      errors,
      title,
      technologies,
      budget,
      experience,
      description,
      contact_email,
    });
  }

  // Hacer todo lowercase para poder hacer el buscador
  technologies = technologies.toLowerCase().replace(/,[ ]+/g, ",");

  Jobs.create({
    title,
    technologies,
    budget,
    experience,
    description,
    contact_email,
  })
    .then(() => {
      return res.redirect("/jobs");
    })
    .catch((err) => console.log(err));
});

// Buscador de trabajos
router.get("/search", (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Jobs.findAll({ where: { technologies: { [Op.like]: `%${term}%` } } })
    .then((Jobs) => res.render("jobs", { Jobs }))
    .catch((err) => res.render("error", { error: err }));
});

module.exports = router;
