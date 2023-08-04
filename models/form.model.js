const mongoose = require("mongoose");

// Sub-schema for header
const headerSchema = new mongoose.Schema({
  title: { type: String, required: false }, // Optional
  description: { type: String, required: false }, // Optional
  imageURL: { type: String, required: false }, // Optional
});

// Sub-schema for Categorize section items
const categorizeItemSchema = new mongoose.Schema({
  name: { type: String, required: false }, // Optional
  category: { type: String, required: false }, // Optional
});

// Sub-schema for Categorize section
const categorizeSchema = new mongoose.Schema({
  type: { type: String, required: false }, // Optional
  title: { type: String, required: false }, // Optional
  description: { type: String, required: false }, // Optional
  categories: { type: [String], required: false }, // Optional
  items: { type: [categorizeItemSchema], required: false }, // Optional
  image: { type: String, required: false }, // Optional
});

// Sub-schema for comprehension multiple questions
const comprehensionQuestionSchema = new mongoose.Schema({
  question: { type: String, required: false }, // Optional
  answers: { type: [String], required: false }, // Optional
});

// Sub-schema for comprehension section
const comprehensionSchema = new mongoose.Schema({
  type: { type: String, required: false }, // Optional
  title: { type: String, required: false }, // Optional
  description: { type: String, required: false }, // Optional
  multipleQuestions: { type: [comprehensionQuestionSchema], required: false }, // Optional
  image: { type: String, required: false }, // Optional
});

// Main schema
const formSchema = new mongoose.Schema({
  id: { type: Number, required: false }, // Optional
  header: { type: headerSchema, required: false }, // Optional
  sections: { type: [mongoose.Schema.Types.Mixed], required: false }, // Using mixed type to allow different sub-schema types
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
