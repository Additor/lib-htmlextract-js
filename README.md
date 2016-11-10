# html-extract-js

[html-extract-js](#) is a javascript library that extracts HTML documents for collecting metadata and core contextual information in infinite webpages.

This library has been created and used in [Additor](https://additor.io) for web-scraping. 
 


## Installation
Using [npm](https://www.npmjs.com/):
```shell
$ npm install --save html-extract-js
```

## API


### Load
First you need to pass a HTML document data as a type of "String" of "Buffer".
Once you get ready to extract the document, load a html-extractor.
  
```js
const HtmlExtractor = require('html-extract-js');
const extractor = HtmlExtractor.load(html);
```

### HtmlExtractor
> The HtmlExtractor uses [cheerio](https://github.com/cheeriojs/cheerio) and [iconv-lite](https://github.com/ashtuchkin/iconv-lite) for extracting document's information.

The HtmlExtractor is a wrapping class of its sub-extractors.
By default, it uses two extractors, [ContextExtractor]() and [MetaExtractor]().


Also, you can configure its extractor through passing `option` parameter.
```js
const option = {
    charset: 'EUC-KR',      // if you set, "iconv-lite" converts the HTML document.
};
const extractor = HtmlExtractor.load(html, option);
```

#### URI
```js
const uri = extractor.getURI();         // "https://additor.io"
```

#### Title
```js
const title = extractor.getTitle();             // "Additor :: Just Add it. Be an Additor"
```

#### Description
```js
const description = extractor.getDescription(); // "Additor is alchemy that turns your scattered information into well-organized content..."
```

#### Thumbnail
```js
const thumbnail = extractor.getThumbnail();     // "https://cdn.additor.io/image/main/landing_temp.png"
```

#### Favicon
```js
const favicon = extractor.getFavicon();         // "https://cdn.additor.io/image/logo/favicon.ico"
```


## License
MIT License
