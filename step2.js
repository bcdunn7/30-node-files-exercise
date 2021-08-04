const fs = require('fs');
const axios = require('axios');

function cat(path) {
    if (path.startsWith('http')) {
        webCat(path);
    }
    else (
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(data)
        })
    )
}

cat(process.argv[2])


async function webCat(url) {
    try {
       let res = await axios.get(url);
        console.log(res); 
    }
    catch (e) {
        console.log(e)
    }
}