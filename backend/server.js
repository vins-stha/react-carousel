const express = require('express')
const app = express();
const port = 5000;
const fs = require('fs')
const yaml = require('js-yaml');
const path = require('path');

app.get('/', async (req, res, next) => {
    let result = [];
    var obj = [];
    let count = 0;


    // read yaml file to get path
    const raw = fs.readFileSync('././config.yml');
    const data = yaml.load(raw);
    let options = {
        root: path.join(__dirname, data.datafolder),
        dotfolders: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    // read contents of the data folder
    fs.readdir(options.root, {encoding: 'utf8', withFileTypes: false}, async (err, folders) => {

        count = folders.length;
        console.log('number of folders', count);
        let i = 1;

        folders.map(async (folder) => {
            let p = path.join(options.root, folder);


            // traverse through each folder
            await fs.readdir(p, {}, (err, files) => {
                const filesWithFullPath = (files.sort()).map((file)=>{return path.join(p,file)})


                console.log(p)
                    var allFilesObject = {
                        name: folder,
                        files: filesWithFullPath //files.sort()
                    };

                    obj.push(allFilesObject);
                    count--;
                    if (count <= 0)
                        return res.json(obj)

                }
            );

        }); // end


    })
  })


app.listen(port, (request, response) => {
    console.log('app running in port ', port)
})
