import express from 'express';
import{cadastrar, listar, buscarPorId, atualizar, excluir} from '../controller/maquinaController.js';

const router = express.Router();

router.post('/', cadastrar);
router.get('/', listar);
router.get('/:id', buscarPorId);
router.patch('/:id', atualizar);
router.delete('/:id', excluir);

export default router;