const { compare, hash } = require('bcryptjs');

class BCryptProvider {
  async comparePasswords(password, hashedPassword) {
    const validation = await compare(password, hashedPassword);
    return validation;
  }

  async hashPassword(password) {
    const passwordHashed = await hash(password, 8);
    return passwordHashed;
  }
}

module.exports = BCryptProvider;
