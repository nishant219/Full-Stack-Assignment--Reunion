module.exports.schemaValidator = (dataToValidate, schema) => {
    return new Promise(async (resolve, reject) => {
      try {
        await schema.validate(dataToValidate);
        resolve({ status: true });
      } catch (e) {
        resolve({ status: false, error: e.errors.join(", ") });
      }
    });
  };