const UpdateSubjectImageUseCase = require('./UpdateSubjectImageUseCase');

class UpdateSubjectImageController {
  async handle(request, response) {
    const { id } = request.params;
    const imageFile = request.file?.filename || '';

    const updateSubjectImageUseCase = new UpdateSubjectImageUseCase();

    await updateSubjectImageUseCase.execute({ subjectId: id, imageFile });

    return response.send();
  }
}

module.exports = UpdateSubjectImageController;
