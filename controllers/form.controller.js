const FormData = require("../models/form.model");

async function getAllForm() {
  const Allforms = await FormData.find();
  return Allforms;
}

async function getEditForm(formId) {
  const updatedForm = await FormData.findById(formId);
  return updatedForm;
}

async function deleteAnyForm(formId) {
  const deletedForm = await FormData.findByIdAndDelete(formId);
  return deletedForm;
}

async function postEditForm(formId, formData) {
  const updatedForm = await FormData.findByIdAndUpdate(
    formId,
    { ...formData },
    { new: true }
  );

  await updatedForm.save();
  return updatedForm;
}

async function postNewForm(formData) {
  const updatedForm = await FormData.insertMany(formData);
  return updatedForm;
}

module.exports = {
  getAllForm,
  getEditForm,
  postEditForm,
  postNewForm,
  deleteAnyForm,
};
