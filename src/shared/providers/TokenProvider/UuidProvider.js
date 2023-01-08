const { v4 } = require('uuid');

class UuidProvider {
  generate() {
    const token = v4();
    return token;
  }
}

module.exports = UuidProvider;
