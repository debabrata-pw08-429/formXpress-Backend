const express = require("express");
const router = express.Router();
const { upload } = require("../configs/multerSetup");
const cloudinary = require("../configs/cloudinarySetup");

const {
  getAllForm,
  getEditForm,
  postEditForm,
  postNewForm,
  deleteAnyForm,
} = require("../controllers/form.controller");

router.get("/forms", async (req, res) => {
  try {
    const forms = await getAllForm();
    res.json(forms);
  } catch (error) {
    console.error("Error retrieving Forms Data from backend:", error);
    res
      .status(500)
      .json({ error: "Internal server error - Error retrieving Forms" });
  }
});

router.post("/forms", async (req, res) => {
  try {
    const formsData = req.body;
    const savedForms = await postNewForm(formsData);
    res.json(savedForms);
  } catch (error) {
    console.error("Error saving Forms Data to the database:", error);
    res
      .status(500)
      .json({ error: "Internal server error - Error saving Forms" });
  }
});

// ------------[Edit Routes]---------------->
router.get("/edit/:id", async (req, res) => {
  const formId = req.params.id;

  try {
    const updatedForm = await getEditForm(formId);
    res.json(updatedForm);
  } catch (error) {
    console.error(`Error Editing Form with id ${formId}`, error);
    res
      .status(500)
      .json({ error: "Internal server error - Error Editing Forms" });
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    let formId = req.params.id;
    let formData = req.body;

    let foundForm = await getEditForm(formId);

    if (!foundForm) {
      return res.status(404).json({ error: "Form not found" });
    }

    if (formData.header.imageURL) {
      let headerImage = formData.header.imageURL;

      const uploadRes = await cloudinary.uploader.upload(headerImage, {
        upload_preset: "formimage",
      });

      if (uploadRes) {
        formData.header.imageURL = uploadRes.secure_url;
      }
    }

    const updatedForm = await postEditForm(formId, formData);

    res.status(200).json(updatedForm);
  } catch (error) {
    console.error({ Error: error });
    res
      .status(500)
      .json({ error: "Internal server error - Error Editing Forms" });
  }
});

router.delete("/forms/:id", async (req, res) => {
  const formId = req.params.id;

  try {
    const deletedForm = await deleteAnyForm(formId);

    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(deletedForm);
  } catch (error) {
    console.error(`Error Deleting Form with id ${formId}`, error);
    res
      .status(500)
      .json({ error: "Internal server error - Error Deleting Forms" });
  }
});

// ------------[Preview Routes]---------------->
router.get("/preview/:id", async (req, res) => {
  const formId = req.params.id;

  try {
    const updatedForm = await getEditForm(formId);
    res.json(updatedForm);
  } catch (error) {
    console.error(`Error Editing Form with id ${formId}`, error);
    res
      .status(500)
      .json({ error: "Internal server error - Error Editing Forms" });
  }
});
module.exports = router;
