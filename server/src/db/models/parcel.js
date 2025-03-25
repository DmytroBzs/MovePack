import { model, Schema } from 'mongoose';

const parcelsSchema = new Schema(
  {
    originCity: {
      type: String,
      required: true,
    },
    destinationCity: {
      type: String,
      required: true,
    },
    parcelType: {
      type: String,
      enum: ['gadgets', 'drinks', 'clothes', 'medicines', 'other'],
      required: true,
      default: 'others',
    },
    date: {
      type: Date,
      required: true,
    },
    parcelDescription: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ParcelsCollection = model('parcels', parcelsSchema);
