const express = require('express');
const router = express.Router();
const albumController = require('../controller/albumController');
const ensureAuthenticated = require('../middleWares/authMiddleware');

router.get('/album',ensureAuthenticated, albumController.getAllAlbums);
router.get('/album/:id',ensureAuthenticated, albumController.getAlbum);
router.post('/album',ensureAuthenticated,albumController.createAlbum);
router.put('/album/:id',ensureAuthenticated, albumController.updateAlbum);
router.delete('/album/:id',ensureAuthenticated, albumController.deleteAlbum);

module.exports = router;