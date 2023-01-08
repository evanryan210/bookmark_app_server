"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaDataRequest = void 0;
const express_1 = __importDefault(require("express"));
const html_metadata_parser_1 = __importDefault(require("html-metadata-parser"));
const app = (0, express_1.default)();
const port = 8080;
// app.set('view engine', 'ejs');
const metaDataRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    console.log(`url: ${url}`);
    try {
        console.log(url);
        (0, html_metadata_parser_1.default)(url).then(result => {
            console.log(JSON.stringify(result, null, 3));
            res.send(JSON.stringify(result, null, 3));
        }).catch(err => {
            console.log('something wrong with parser');
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).send({});
    }
});
exports.metaDataRequest = metaDataRequest;
app.get('/metadata', exports.metaDataRequest);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
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
