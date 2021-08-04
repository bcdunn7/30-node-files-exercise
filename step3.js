const fs = require('fs');
const axios = require('axios');

async function cat(path) {
    let result = await readAndResp(path);
    console.log(result);
}

async function readAndResp(path) {
    if (checkifURL(path)) {
        let resp = await webCat(path)
        return resp;
    }
    else {
        let resp = read(path);
        return resp;
    }
}

function read(path) {
    try {
        let res = fs.readFileSync(path, 'utf8')
        return res;
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
}

function checkifURL(path) {
    if (path.startsWith('http')) {
        return true
    }
    else {return false}
}


async function webCat(url) {
    try {
        let res = await axios.get(url);
        return res; 
    }
    catch (e) {
        return e;
    }
}


async function write(file, path) {
    let content = await readAndResp(path);
    fs.writeFile(file, content, 'utf8', function(err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        console.log('Success')
    })
}


function acceptCommand(){
    if (process.argv[2] === '--out'){
        write(process.argv[3], process.argv[4])
    } else {
        cat(process.argv[2])
    }
}

acceptCommand()