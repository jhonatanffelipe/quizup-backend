const { Router } = require('express');
const CreateTopicController = require('../../../useCases/createTopic/CreateTopicController');
const ListTopicsContoller = require('../../../useCases/listTopics/ListTopicsContoller');

const topicsRoutes = Router();

const createTopicController = new CreateTopicController();
const listTopicsContoller = new ListTopicsContoller();

topicsRoutes.post('/', createTopicController.handle);
topicsRoutes.get('/:categoryId', listTopicsContoller.handle);

module.exports = topicsRoutes;
