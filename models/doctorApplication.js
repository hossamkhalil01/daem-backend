const { model, Schema } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const SPECIALITIES_LIST = require("../utils/specialities");
const doctorApplicationSchema = new Schema({

  applicant: {
    type: Schema.Types.ObjectId,
    required: "Applicant is required",
    default: null,
  },

  speciality: {
    type: String,
    enum: SPECIALITIES_LIST,
    required: "Speciality is required",
    trim: true,
  },

  about: {
    type: String,
    maxLength: [1000, "About section must no exceed 300 chars"],
    trim: true,
  },

  nationalId: {
    type: String,
    required: "National ID is required",
  },

  doctorId: {
    type: String,
    required: "Doctor ID is required",
  },

});


// Add pagination plugin
doctorApplicationSchema.plugin(mongoosePaginate);

module.exports = model("DoctorApplication", doctorApplicationSchema);
