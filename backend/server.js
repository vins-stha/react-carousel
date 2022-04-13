const express = require('express')
const app = express();
const port = 5000;
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const cors = require('cors');


// middlewares
const corsOptions = {
    "origin": "*",
    "methods": "GET",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
};

app.use(cors(corsOptions));

// serve image files
app.use('/content', express.static(__dirname + '/content'));

// router
app.get('/', async (req, res, next) => {

    var obj = [];
    let count = 0;

    // read yaml file to get path
    const raw = fs.readFileSync('././config.yml');
    const data = yaml.load(raw);
    let rootpath = {
        root: path.join(__dirname, data.datafolder),
    };
    obj.push({
        root: data.datafolder
    });

    // read contents of the data folder
    fs.readdir(rootpath.root, {encoding: 'utf8', withFileTypes: false}, async (err, folders) => {

        count = folders.length;

        folders =  folders.map(folder => folder.toLowerCase()).sort()
        console.log(folders)
        folders.map( (folder) => {
            let p = path.join(rootpath.root, folder);

            // traverse through each folder
             fs.readdir(p, {}, async(err, files) => {

                    // create object with folder name and its contents
                    var allFilesObject = {
                        name: folder,
                        files: files//.sort(),
                    };

                   await obj.push(allFilesObject);
                    count--;
                    if (count <= 0) {
                        // console.log(obj)
                        return res.json(obj)
                    }

                }
            );

        }); // end

    })
});


app.listen(port, (request, response) => {
    console.log('Server started at port  ', port)
});
