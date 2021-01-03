![Tests](https://github.com/rescodeio/tense-builder/workflows/Tests/badge.svg)

# Tense Builder

## Instalation  

`npm i tense-builder -S`

## Usage

### Parse mode   

```js
const TenseBuilder = require('tene-builder')
const tenseBuilder = new TenseBuilder()
tenseBuilder.config.space = '-'

const result = tenseBuilde.build('places-or-regions-with-hot-climate-and-low-racism-ubicated-in-romania-or-barcelona')

console.log(result)

// output is:
/*
[
    {
        word: 'places',
        type: 'subject',
        mood: 'or',
    },
    {
        word: 'regions',
        type: 'subject',
        mood: 'or',
    },
    {
        word: 'hot climate',
        type: 'what',
        mood: 'and',
    },
    {
        word: 'low racism',
        type: 'what',
        mood: 'and',
    },
    {
        word: 'romania',
        type: 'where',
        mood: 'or',
    },
    {
        word: 'barcelona',
        type: 'where',
        mood: 'or',
    },
]
*/
```


### Build  mode
```js
const TenseBuilder = require('tene-builder')
const tenseBuilder = new TenseBuilder()

tenseBuilder.config.space = '-'

const parts = [
    {
        word: 'places',
        type: 'subject',
        mood: 'or',
    },
    {
        word: 'regions',
        type: 'subject',
        mood: 'or',
    },
    {
        word: 'hot climate',
        type: 'what',
        mood: 'and',
    },
    {
        word: 'low racism',
        type: 'what',
        mood: 'and',
    },
    {
        word: 'romania',
        type: 'where',
        mood: 'or',
    },
    {
        word: 'barcelona',
        type: 'where',
        mood: 'or',
    },
]

const result = tenseBuilde.build(parts)

console.log(result)
// output is: 
/*
    "places-or-regions-with-hot-climate-and-low-racism-ubicated-in-romania-or-barcelona"
*/
```

### Types

"subject" your subject

"what" for stuff

"whatNegative" for negate stuff

"where" for ubications

### Moods

"or" / "and"