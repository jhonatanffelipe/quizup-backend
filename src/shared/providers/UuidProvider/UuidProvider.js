const { v4, validate, version } = require('uuid');

class UuidProvider {
  generate() {
    const token = v4();
    return token;
  }

  validate(value) {
    return validate(value) && version(value) === 4;
  }
}

module.exports = UuidProvider;
