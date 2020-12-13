# Tense Builder

## Instalation

`npm i tense-builder -S`

## Usage

```
const TenseBuilder = require('tene-builder)
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
// result is: 
// "places-or-regions-with-hot-climate-and-low-racism-ubicated-in-romania-or-barcelona"
```

### Types

"subject" your subject

"what" for stuff

"where" for ubications

### Moods

"or" / "and"