import mongoose, { Document, Schema } from 'mongoose';

const seriesSchema = new mongoose.Schema({
  titleEN: { type: String, required: true, unique:true},
  titleHU: { type: String},
  descriptionEN: { type: String},
  descriptionHU: { type: String },
  cover:{type:String},
});

export const SeriesModel = mongoose.model('Series', seriesSchema);

export const getSeries = ()=> 
  SeriesModel.find();

export const getSerieById = (id: string)=> 
  SeriesModel.findById(id);

export const getSerieByTitleEN = (titleEN:string) => 
  SeriesModel.findOne({titleEN});

export const getSerieByTitleHU = (titleHU:string) =>
  SeriesModel.findOne({titleHU});

export const createSerie = (serie:Record<string, any>) =>
  new SeriesModel(serie).save().then((serie)=>serie.toObject());

export const deleteSerieById = (id:string)=>
  SeriesModel.findByIdAndDelete({_id:id});

export const updateSerieById = (id:string, update: Record<string, any>) =>
  SeriesModel.findByIdAndUpdate(id, update);
