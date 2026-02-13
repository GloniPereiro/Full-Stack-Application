const File = require('../models/file');

const listFiles = async () => {
    const files = await File.find();
    return files;
};

module.exports =listFiles;
