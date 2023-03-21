import express, { Request, response, Response } from 'express';
import fetch from 'node-fetch';
import parser from 'html-metadata-parser'
import {GoogleAuth} from 'google-auth-library'
import {google} from 'googleapis'

const app = express();
const port = 8080;
// app.set('view engine', 'ejs');


export const metaDataRequest = async(req: Request, res: Response) =>{
  const url = req.query.url as string
  console.log(`url: ${url}`)
  try{
    console.log(url)
    
    parser(url).then(result=>{
      console.log(JSON.stringify(result,null, 3));
      res.send(JSON.stringify(result,null,3))
    }).catch(err=>{
      console.log('something wrong with parser')
    })
  }
  catch(error){
    console.error(error)
    res.status(400).send({})
  }
}

app.get('/metadata', metaDataRequest) 

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });





//ChatGPT solution

// app.get('/metadata', (req, res) => {
//     const url = req.query.url;
  
//     request(url, (error, response, html) => {
//       if (!error && response.statusCode === 200) {
//         const $ = cheerio.load(html);
  
//         const title = $('title').text();
//         const description = $('meta[name=description]').attr('content');
  
//         res.send({ title, description });
//       } else {
//         res.sendStatus(500);
//       }
//     });
//   });
  