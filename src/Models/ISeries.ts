import mongoose, { Document, Schema } from 'mongoose';


export interface ISerie {
    titleEN: string;
    titleHU: string;
    descriptionEN: string;
    descriptionHU: string;
}

const seriesSchema = new Schema<ISerie>({
  titleEN: { type: String, required: true },
  titleHU: { type: String, required: true},
  descriptionEN: { type: String, required: true},
  descriptionHU: { type: String, required: true},
  
}, { timestamps: true });

const Serie = mongoose.model<ISerie>('User', seriesSchema);

export default Serie;
