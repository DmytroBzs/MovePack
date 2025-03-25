import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createParcelSchema,
  updateParcelSchema,
} from '../validation/parcels.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createParcelController,
  deleteParcelController,
  getParcelsController,
  updateParcelController,
} from '../controllers/parcels.js';

const router = Router();

router.get('/', ctrlWrapper(getParcelsController));

router.post(
  '/',
  validateBody(createParcelSchema),
  ctrlWrapper(createParcelController),
);
router.patch(
  '/:id',
  isValidId,
  validateBody(updateParcelSchema),
  ctrlWrapper(updateParcelController),
);
router.delete('/:id', isValidId, ctrlWrapper(deleteParcelController));

export default router;
