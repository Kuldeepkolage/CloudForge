const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    repositoryUrl: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Building", "Deploying", "Running", "Failed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
