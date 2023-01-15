const { Router } = require('express');
const CreateTagController = require('../../../useCases/createTag/CreateTagController');
const ListTagsContoller = require('../../../useCases/listTags/ListTagsContoller');

const tagsRoutes = Router();

const createTagController = new CreateTagController();
const listTagsContoller = new ListTagsContoller();

tagsRoutes.post('/', createTagController.handle);
tagsRoutes.get('/', listTagsContoller.handle);

module.exports = tagsRoutes;
