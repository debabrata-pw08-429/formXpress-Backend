const FormData = require("../models/form.model");

const initialFormData = require("../constants/index");

async function addInitialFormData() {
  try {
    await FormData.deleteMany();

    // Save the initialFormData to the database
    await FormData.insertMany(initialFormData);
    console.log("Initial form data added successfully!");
  } catch (error) {
    console.error("Error adding initial form data:", error);
  }
}

module.exports = addInitialFormData;
