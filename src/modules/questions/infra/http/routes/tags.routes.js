const { Router } = require('express');
const CreateTagController = require('../../../useCases/createTag/CreateTagController');
const ListTagsContoller = require('../../../useCases/listTags/ListTagsContoller');
const ListTagByIdContoller = require('../../../useCases/listTagById/ListTagByIdContoller');
const UpdateTagsContoller = require('../../../useCases/updateTags/UpdateTagsContoller');
const DeleteTagController = require('../../../useCases/deleteTag/DeleteTagContoller');

const tagsRoutes = Router();

const createTagController = new CreateTagController();
const listTagsContoller = new ListTagsContoller();
const listTagByIdContoller = new ListTagByIdContoller();
const updateTagsContoller = new UpdateTagsContoller();
const deleteTagController = new DeleteTagController();

tagsRoutes.post('/', createTagController.handle);
tagsRoutes.get('/', listTagsContoller.handle);
tagsRoutes.get('/:id', listTagByIdContoller.handle);
tagsRoutes.put('/:id', updateTagsContoller.handle);
tagsRoutes.delete('/:id', deleteTagController.handle);

module.exports = tagsRoutes;
