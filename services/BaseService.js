module.exports = class BaseService {
  async findAll() {
    return this.model.find();
  }

  async add(item) {
    try {
      return this.model.create(item);
    } catch (error) {
      return error.message;
    }
  }

  async del(itemId) {
    return this.model.remove({ _id: itemId });
  }

  async find(itemId) {
    return this.model.findById(itemId);
  }

  async query(object) {
    return this.model.find(object);
  }

  async update(itemId, set) {
    return this.model.update(itemId, set, { upsert: true });
  }

  async saveObject() {
    return this.model.save();
  }
};
