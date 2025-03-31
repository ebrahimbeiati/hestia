import express from 'express';
import { createTenant, getTenant, updateTenant, getTenantProperties, addFavoriteProperty, removeFavoriteProperty } from '../controllers/tenantController';

const router = express.Router();

router.get('/:cognitoId', getTenant);
router.put('/:cognitoId', updateTenant);
router.get("/:cognitoId/current - residences", getTenantProperties);
router.post('/', createTenant);
router.post('/:cognitoId/favorites/:propertyId', addFavoriteProperty);
router.delete('/:cognitoId/favorites/:propertyId', removeFavoriteProperty);



export default router;