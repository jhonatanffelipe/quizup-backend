const { Router } = require('express');

const ensureAuthenticated = require('../../../../users/infra/http/middlewares/esureAuthenticated');
const ListQuestionsTypesContoller = require('../../../useCases/listQuestionsTypes/ListQuestionsTypesContoller');
const ListQuestionTypeByIdContoller = require('../../../useCases/listQuestionTypeById/ListQuestionTypeByIdContoller');
const CreateQuestionTypeContoller = require('../../../useCases/createQuestionType/CreateQuestionTypeContoller');
const DeleteQuestionTypeContoller = require('../../../useCases/deleteQuestionType/DeleteQuestionTypeContoller');
const UpdateQuestionTypeContoller = require('../../../useCases/updateQuestionType/UpdateQuestionTypeContoller');

const questionsTypesRoutes = Router();

const listQuestionsTypesContoller = new ListQuestionsTypesContoller();
const listQuestionTypeByIdContoller = new ListQuestionTypeByIdContoller();
const createQuestionTypeContoller = new CreateQuestionTypeContoller();
const deleteQuestionTypeContoller = new DeleteQuestionTypeContoller();
const updateQuestionTypeContoller = new UpdateQuestionTypeContoller();

questionsTypesRoutes.use(ensureAuthenticated);

questionsTypesRoutes.post('/', createQuestionTypeContoller.handle);
questionsTypesRoutes.get('/', listQuestionsTypesContoller.handle);
questionsTypesRoutes.get('/:id', listQuestionTypeByIdContoller.handle);
questionsTypesRoutes.delete('/:id', deleteQuestionTypeContoller.handle);
questionsTypesRoutes.put('/:id', updateQuestionTypeContoller.handle);

module.exports = questionsTypesRoutes;
