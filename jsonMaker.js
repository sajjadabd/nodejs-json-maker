// const express = require('express')
const path = require('path')
const fs = require('fs');
const readline = require('readline');
// const app = express()
// const port = 3000

let branches = [
  { title : 'خدمات' , index : 1 },
  { title : 'صنعت' , index : 2 },
  { title : 'فرهنگ و هنر' , index : 3 },
  { title : 'کشاورزی' , index : 4 },
]


fs.writeFile('chapters-json.json', '', function(){console.log('clear file')})

// app.use('/public', express.static(path.join(__dirname, 'public')))


async function processLineByLine() {
  
  const fileStream = fs.createReadStream('stn.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  fs.appendFile('chapters-json.json', '\[' , function (err) {
    if (err) throw err;
  });

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    // console.log(`Line from file: ${line}`);
    // console.log(typeof line)
    // line.replace('"' , '')
    const found = line.split(',');
    // console.log(Number(found[0]));

    
    
    if ( parseInt(found[0].replace(/"/g,'')) > 2 ) {
      let tempIndex = parseInt(found[0].replace(/"/g,''))-4;
      if ( found[0] && found[1] && found[2] && found[3] ) {
        fs.appendFile('chapters-json.json', 
        '\t\{' + '\n' +
        '\t\t' +  '"index" : '    +  '"' +  tempIndex + '"' + ',' + '\n' +
        '\t\t' +  '"branch" : '   +  '"' +  found[1].replace(/"/g,'') + '"' + ',' + '\n' +
        '\t\t' +  '"group" : '    +  '"' +  found[2].replace(/"/g,'') + '"' + ',' + '\n' +
        '\t\t' +  '"standard" : ' +  '"' +  found[3].replace(/"/g,'') + '"'  +  '\n' +
        '\t\},' + '\n'
         , function (err) {
            if (err) throw err;
        });
      }
    } else {
      // fs.appendFile('chapters-json.txt', 
      //   found[0].replace(/"/g,'') + '\n' +
      //   found[1].replace(/"/g,'') + '\n' +
      //   found[2].replace(/"/g,'') + '\n' +
      //   found[3].replace(/"/g,'') + '\n\n\n' , function (err) {
      //       if (err) throw err;
      //   });
    }
  }

  fs.appendFile('chapters-json.json', '\]' , function (err) {
    if (err) throw err;
  });

}

processLineByLine();

// app.get('/', (req, res) => { 
  
// });



// fs.readFile(path.join(__dirname ,'/public/standards.tsv'), (err, data) => {
// 	if (err) throw err;
//   let branches = JSON.parse(data);
//   console.log(branches);
// });



// app.listen(port, () => console.log(`app listening at http://localhost:${port}`))
