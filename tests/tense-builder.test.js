const TenseBuilder = require('../src');

test('Error control', () => {
    const tenseBuilder = new TenseBuilder()
    
    expect(() => tenseBuilder.build(1)).toThrowError(Error)
    expect(() => tenseBuilder.build()).toThrowError(Error)
})

test('Separator config', () => {
    const tenseBuilder = new TenseBuilder()
    tenseBuilder.config.separator = '-'
    const parts = [
        {
            word: 'places',
            type: 'subject',
            mood: 'or',
        },
        {
            word: 'hot climate',
            type: 'what',
            mood: 'and',
        },
        {
            word: 'andorra la vella',
            type: 'where',
            mood: 'or',
        },
    ]

    const result = tenseBuilder.build(parts)
    expect(result)
        .toBe('places-with-hot-climate-ubicated-in-andorra-la-vella')
})

test('Build', () => {
    const tenseBuilder = new TenseBuilder()
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
            word: 'ubications',
            type: 'subject',
            mood: 'and',
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

    const result = tenseBuilder.build(parts)

    expect(result)
        .toBe('places or regions and ubications with hot climate and low racism ubicated in romania or barcelona')
});