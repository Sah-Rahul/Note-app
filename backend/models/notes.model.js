import mongoose, { model, Schema } from "mongoose";

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    important: {
      type: String,
      default: 'lower',
      enum: ["high","medium","lower"]
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const notesModel = model("Note", notesSchema);

export default notesModel;
