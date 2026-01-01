const fs = require('fs');
const path = require('path');   
    
const validation = (req, res, next) => {  
    const oldFilename = req.params.filename;
    const newFilename = req.body.newName;
    const oldFilePath = path.join(process.cwd(), 'uploads', oldFilename);
    const newFilePath = path.join(process.cwd(), 'uploads', newFilename);

    const ext = path.extname(newFilename);
    const base = path.basename(newFilename, ext);
    if (/^\.+$/.test(base)) {
        const error = new Error('Nazwa pliku nie może składać się tylko z kropek');
        error.status = 400;
        return next(error);
    }

    //walidacja żeby nazwa była podana
    if (!newFilename) {
        const error = new Error('Nowa nazwa pliku jest wymagana');
        error.status = 400;
        return next(error);
    }
    //walidacja żeby nazwa nie była pusta
    if (newFilename.trim() === '') {
        const error = new Error('Nazwa pliku nie może być pusta');
        error.status = 400;
        return next(error);
    }
    //walidacja żeby plik istniał
    if (!fs.existsSync(oldFilePath)) {
        const error = new Error('Plik nie istnieje');
        error.status = 404;
        return next(error);
    }
    //walidacja żeby nazwa nie zawierała niedozwolonych znaków,
    // eslint-disable-next-line no-control-regex
    const invalidChars = /[<>:"'/\\=;|?*\x00-\x1F]/;
    if (invalidChars.test(newFilename)) {
        const error = new Error('Nazwa pliku zawiera niedozwolone znaki');
        error.status = 400;
        return next(error);
    }   
    //walidacja żeby nowa nazwa nie była już zajęta
    if (fs.existsSync(newFilePath)) {
        const error = new Error('Plik o podanej nazwie już istnieje');
        error.status = 400;
        return next(error);
    }
    return next();
};

module.exports = validation;