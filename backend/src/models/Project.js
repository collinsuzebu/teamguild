import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Project Schema
const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: Object,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

ProjectSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

const Project = mongoose.model("Project", ProjectSchema);

export { Project };
