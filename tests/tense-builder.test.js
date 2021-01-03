const TenseBuilder = require('../src');

test('Error control', () => {
    const tenseBuilder = new TenseBuilder()
    
    expect(() => tenseBuilder.build(1)).toThrowError(Error)
    expect(() => tenseBuilder.build()).toThrowError(Error)
    expect(() => tenseBuilder.parse(1)).toThrowError(Error)
    expect(() => tenseBuilder.parse()).toThrowError(Error)
})

test('Parse without and/or', () => {
    const tenseBuilder = new TenseBuilder()
    tenseBuilder.config.separator = '-'
    const result = tenseBuilder.parse('places-with-hot-climate-ubicated-in-romania')

    expect(result)
        .toStrictEqual([
            {
                word: 'places',
                type: 'subject',
                mood: 'and',
            },
            {
                word: 'hot climate',
                type: 'what',
                mood: 'and',
            },
            {
                word: 'romania',
                type: 'where',
                mood: 'and',
            },
        ])
})

test('Inverse parse with configured separator', () => {
    const tenseBuilder = new TenseBuilder()
    tenseBuilder.config.separator = '-'
    const result = tenseBuilder.parse('places-or-regions-and-ubications-with-hot-climate-and-low-racism-ubicated-in-romania-or-barcelona')

    expect(result)
        .toStrictEqual([
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
        ])
})

test('Inverse parse', () => {
    const tenseBuilder = new TenseBuilder()
    const result = tenseBuilder.parse('places or regions and ubications with hot climate and low racism ubicated in romania or barcelona')

    expect(result)
        .toStrictEqual([
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
        ])
})

test('Inverse without what', () => {
    const tenseBuilder = new TenseBuilder()
    const result = tenseBuilder.parse('places or regions and ubications ubicated in romania or barcelona')

    expect(result)
        .toStrictEqual([
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
                word: 'romania',
                type: 'where',
                mood: 'or',
            },
            {
                word: 'barcelona',
                type: 'where',
                mood: 'or',
            },
        ])
})

test('Inverse without where', () => {
    const tenseBuilder = new TenseBuilder()
    const result = tenseBuilder.parse('places or regions and ubications with hot climate and low racism without cold winters or hot summers')

    expect(result)
        .toStrictEqual([
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
                word: 'cold winters',
                type: 'whatNegative',
                mood: 'or',
            },
            {
                word: 'hot summers',
                type: 'whatNegative',
                mood: 'or',
            },
        ])
})

test('Inverse without what or where', () => {
    const tenseBuilder = new TenseBuilder()
    const result = tenseBuilder.parse('places or regions and ubications')

    expect(result)
        .toStrictEqual([
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
        ])
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

test('Build without what', () => {
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
            word: 'cold winters',
            type: 'whatNegative',
            mood: 'and',
        },
        {
            word: 'startups',
            type: 'whatNegative',
            mood: 'and',
        },
    ]

    const result = tenseBuilder.build(parts)

    expect(result)
        .toBe('places or regions and ubications with hot climate and low racism without cold winters and startups')
})

test('Build with only subject', () => {
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
    ]

    const result = tenseBuilder.build(parts)

    expect(result)
        .toBe('places or regions and ubications')
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
            word: 'cold winters',
            type: 'whatNegative',
            mood: 'and',
        },
        {
            word: 'startups',
            type: 'whatNegative',
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
        .toBe('places or regions and ubications with hot climate and low racism without cold winters and startups ubicated in romania or barcelona')
})