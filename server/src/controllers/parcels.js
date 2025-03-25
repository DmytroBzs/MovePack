import createHttpError from 'http-errors';
import {
  createParcel,
  deleteParcel,
  getAllParcels,
  updateParcel,
} from '../services/parcels.js';

export const getParcelsController = async (req, res) => {
  const parcels = await getAllParcels();

  res.status(200).json({
    status: 200,
    message: 'Successfully found parcels!',
    data: parcels,
  });
};

export const createParcelController = async (req, res) => {
  const parcel = await createParcel(req.body);

  res.status(201).json({
    status: 201,
    message: 'Parcel has been successfully added',
    data: parcel,
  });
};

export const updateParcelController = async (req, res) => {
  const { id } = req.params;

  const parcel = await updateParcel(id, req.body);

  if (!parcel) {
    throw createHttpError(404, 'Parcel is not found');
  }

  res.json({
    status: 200,
    message: 'Parcel is updated',
    data: parcel,
  });
};

export const deleteParcelController = async (req, res) => {
  const { id } = req.params;

  const parcel = await deleteParcel(id);

  if (!parcel) {
    throw createHttpError(404, 'Parcel not found');
  }

  res.status(204).send();
};
