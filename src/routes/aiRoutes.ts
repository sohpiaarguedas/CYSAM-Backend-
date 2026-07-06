import { Router } from 'express';
import { getResponseAi } from '../controllers/aiController';

const aiRoutes = Router();

aiRoutes.post('',getResponseAi);

export default aiRoutes;