import mongoose, { Document, Schema } from 'mongoose';

const seriesSchema = new mongoose.Schema({
  titleEN: {
    type: String,
    required: true,
  },
  titleHU: {
    type: Date,
    required: true,
  },
  descriptionEN: {
    type: Number,
    required: true,
  },
  descriptionHU: {
    type: Number,
    required: true,
  },
});

export const SeriesModel = mongoose.model('Series', seriesSchema);
