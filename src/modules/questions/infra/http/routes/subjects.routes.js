const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('../../../../../config/upload');
const CreateSubjectController = require('../../../useCases/createSubject/CreateSubjectController');
const DeleteSubjectController = require('../../../useCases/deleteSubject/DeleteSubjectContoller');
const ListSubjectByIdController = require('../../../useCases/listSubjectById/ListSubjectByIdContoller');
const ListSubjectsContoller = require('../../../useCases/listSubjects/ListSubjectsContoller');
const UpdateSubjectImageController = require('../../../useCases/updateSubjectImage/UpdateSubjectImageController');
const UpdateSubjectSequenceController = require('../../../useCases/updateSubjectSequence/UpdateSubjectSequenceContoller');

const subjectRoutes = Router();

const uploadImage = multer(uploadConfig);

const createSubjectController = new CreateSubjectController();
const listSubjectsContoller = new ListSubjectsContoller();
const listSubjectByIdController = new ListSubjectByIdController();
const updateSubjectSequenceController = new UpdateSubjectSequenceController();
const updateSubjectImageController = new UpdateSubjectImageController();
const deleteSubjectController = new DeleteSubjectController();

subjectRoutes.post('/', createSubjectController.handle);
subjectRoutes.get('/all/:categoryId', listSubjectsContoller.handle);
subjectRoutes.get('/:id', listSubjectByIdController.handle);
subjectRoutes.patch('/sequence/:id', updateSubjectSequenceController.handle);
subjectRoutes.patch('/image/:id', uploadImage.single('image'), updateSubjectImageController.handle);
subjectRoutes.delete('/:id', deleteSubjectController.handle);

module.exports = subjectRoutes;
