# Stringlish

This class helps parse, format, and transform strings. It supports both Node and browser use.

## Usage

### Node

`npm i stringlish`

```
let Stringlish = require("stringlish");
```

Minified version:

```
let Stringlish = require("stringlish/dist/Stringlish.min");
```

[Visit package on npm](https://www.npmjs.com/package/stringlish)

[![npm](https://nodei.co/npm/stringlish.png)](https://www.npmjs.com/package/stringlish)

### Browser

```
import Stringlish from "stringlish";
```

Minified version:

```
import Stringlish from "stringlish/dist/Stringlish.min";
```

Script tag:

```
<script src="node_modules/stringlish/dist/Stringlish.min.js"></script>
```

## Notes

- This project is lightweight and dependency free.
- The source code is written in ES6 and transpiled with Babel.
- If you need to create documentation for local use, run `npm run doc`. Otherwise, visit the online [docs](http://grafluxe.com/o/doc/stringlish/Stringlish.html).

## Samples

### Static Methods

#### Stringlish.firstLetterUpper(*str*);

```
Stringlish.firstLetterUpper("hello world");
// Hello world
```

-

#### Stringlish.firstLettersUpper(*str*);

```
Stringlish.firstLettersUpper("hello world");
// Hello World
```

-

#### Stringlish.toCamelCase(*str*);

```
Stringlish.toCamelCase("hello world");
// helloWorld
```

-

#### Stringlish.toPascalCase(*str*);

```
Stringlish.toPascalCase("hello world");
// HelloWorld
```

-

#### Stringlish.toSnakeCase(*str*);

```
Stringlish.toSnakeCase("hello world");
// hello_world
```

-

#### Stringlish.toKebabCase(*str*);

```
Stringlish.toKebabCase("hello world");
// hello-world
```

-

#### Stringlish.trimLeft(*str*);

```
Stringlish.trimLeft("  hello world");
// hello world
```

-

#### Stringlish.trimRight(*str*);

```
Stringlish.trimRight("hello world  ");
// hello world
```

-

#### Stringlish.trim(*str*);

```
Stringlish.trim("  hello world  ");
// hello world
```

-

#### Stringlish.cutStr(*str*, *maxLength*, *ellipsis = true*);

```
Stringlish.cutStr("Get on the good foot", 6);
// Get o…

Stringlish.cutStr("Get on the good foot", 10, false);
// Get on the
```

-

#### Stringlish.cutStrAtWords(*str*, *maxLength*, *ellipsis = true*);

```
Stringlish.cutStrAtWords("Get on the good foot", 5);
// Get…
```

-

#### Stringlish.cutStrReverse(*str*, *maxLength*, *ellipsis = true*);

```
Stringlish.cutStrReverse("Get on the good foot", 9);
// …ood foot
```

-

#### Stringlish.cutStrAtWordsReverse(*str*, *maxLength*, *ellipsis = true*);

```
Stringlish.cutStrAtWordsReverse("Get on the good foot", 9);
// …foot
```

-

#### Stringlish.wordCount(*str*);

```
Stringlish.wordCount("hello world");
// 2
```

-

#### Stringlish.addOrdinalIndicator(*num*);

```
Stringlish.addOrdinalIndicator(1);
// 1st

Stringlish.addOrdinalIndicator(22);
// 22nd

Stringlish.addOrdinalIndicator(103);
// 103rd
```

-

#### Stringlish.parseMath(*str*);

```
Stringlish.parseMath("2+2");
// 4

Stringlish.parseMath("(5-3)*2");
// 4

Stringlish.parseMath("5-3*2");
// -1

Stringlish.parseMath("-10+-2");
// -12
```

-

#### Stringlish.readableNumber(*num*);

```
Stringlish.readableNumber(100000);
// 100,000

Stringlish.readableNumber(1000.75);
// 1,000.75
```

-

See the full documentation [here](http://grafluxe.com/o/doc/stringlish/Stringlish.html).

## License

Copyright (c) 2014, 2017 Leandro Silva (http://grafluxe.com)

Released under the MIT License.

See LICENSE.md for entire terms.
