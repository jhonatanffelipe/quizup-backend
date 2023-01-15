const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('../../../../../config/upload');
const CreateTopicController = require('../../../useCases/createTopic/CreateTopicController');
const DeleteTopicController = require('../../../useCases/deleteTopic/DeleteTopicContoller');
const ListTopicByIdController = require('../../../useCases/listTopicById/ListTopicByIdContoller');
const ListTopicsContoller = require('../../../useCases/listTopics/ListTopicsContoller');
const UpdateTopicImageController = require('../../../useCases/updateTopicImage/UpdateTopicImageController');
const UpdateTopicSequenceController = require('../../../useCases/updateTopicSequence/UpdateTopicSequenceContoller');

const topicsRoutes = Router();

const uploadImage = multer(uploadConfig);

const createTopicController = new CreateTopicController();
const listTopicsContoller = new ListTopicsContoller();
const listTopicByIdController = new ListTopicByIdController();
const updateTopicSequenceController = new UpdateTopicSequenceController();
const updateTopicImageController = new UpdateTopicImageController();
const deleteTopicController = new DeleteTopicController();

topicsRoutes.post('/', createTopicController.handle);
topicsRoutes.get('/all/:categoryId', listTopicsContoller.handle);
topicsRoutes.get('/:id', listTopicByIdController.handle);
topicsRoutes.patch('/sequence/:id', updateTopicSequenceController.handle);
topicsRoutes.patch('/image/:id', uploadImage.single('image'), updateTopicImageController.handle);
topicsRoutes.delete('/:id', deleteTopicController.handle);

module.exports = topicsRoutes;
