const TenseBuilder = function () {
    this.config = {
        types: {
            subject: '%',
            what: 'with %',
            whatNegative: 'without %',
            where: 'ubicated in %',
        },
        separator: ' ',
    }
}

TenseBuilder.prototype.parse = function(tense) {
    const errors = this.validateParse(tense).length
    if(errors !== 0){
        throw new Error(errors)
    }

    tense = tense.split(this.config.separator).join(' ')

    let response = []

    const whatSplitter = this.config.types.what.split(' ').join(' ').replace(/%/g, '')
    const whatNegativeSplitter = this.config.types.whatNegative.split(' ').join(' ').replace(/%/g, '')
    const whereSplitter = this.config.types.where.split(' ').join(' ').replace(/%/g, '')

    const subjectSplitted = this.ext(tense, [whatSplitter, whatNegativeSplitter, whereSplitter])

    const s = this.andOrClassification(subjectSplitted[0], 'subject')
    response = response.concat(s)

    tense = subjectSplitted[1]

    const hasWhat = tense.indexOf(whatSplitter) != -1
    if(hasWhat){
        const whatSplitted = this.ext(tense, [whatNegativeSplitter, whereSplitter])
        tense = whatSplitted[1]
        const wha = this.andOrClassification(whatSplitted[0].replace(whatSplitter, ''), 'what')
        response = response.concat(wha)
    }

    const hasWhatNegative = tense.indexOf(whatNegativeSplitter) != -1
    if(hasWhatNegative){
        const whatNegativesplitted = this.ext(tense, [whereSplitter])
        tense = whatNegativesplitted[1]
        
        const whatN = this.andOrClassification(whatNegativesplitted[0].replace(whatNegativeSplitter, ''), 'whatNegative')
        response = response.concat(whatN)
    }

    const hasWhere = tense.indexOf(whereSplitter) != -1
    if(hasWhere){
        const whereSlitted = this.ext(tense, [])
        const whe = this.andOrClassification(whereSlitted[0].replace(whereSplitter, ''), 'where')
        response = response.concat(whe)
    }

    return response
}

TenseBuilder.prototype.ext = function(tense, arr) {
    const i = arr.map(x => tense.indexOf(x)).find(x => x !== -1)
    if(i === undefined){
        return [
            tense,
            '',
        ]
    }
    return [
        tense.slice(0, i).trim(),
        tense.slice(i, tense.length).trim(),
    ]
}

TenseBuilder.prototype.andOrClassification = function(tense, type) {
    const s = tense.split(' ')

    if(s.find(x => x === 'and' || x === 'or') == null){
        return tense
    }

    if(s.find(x => x === 'and') == null){
        const o = s.join(' ').split('or')
        return o.map(x => {
            return {
                word: x.trim(),
                type,
                mood: 'or',
            }
        })
    }

    if(s.find(x => x === 'or') == null){
        const a = s.join(' ').split('and')
        return a.map(x => {
            return {
                word: x.trim(),
                type,
                mood: 'and',
            }
        })
    }

    const p = tense.split('and')
    const ors = p[0].split('or')
    p.splice(0, 1)

    const orsMapped = ors.map(x => {
        return {
            word: x.trim(),
            type,
            mood: 'or',
        }
    })

    const andsMapped = p.map(x => {
        return {
            word: x.trim(),
            type,
            mood: 'and',
        }
    })

    return orsMapped.concat(andsMapped)
}

TenseBuilder.prototype.build = function(parts) {
    const errors = this.validate(parts).length
    if(errors !== 0){
        throw new Error(errors)
    }

    const subject = this.extract(parts, 'subject')
    const what = this.extract(parts, 'what')
    const whatNegative = this.extract(parts, 'whatNegative')
    const where = this.extract(parts, 'where')

    return `${this.join(subject)} ${this.join(what)} ${this.join(whatNegative)} ${this.join(where)}`
        .split(' ')
        .filter(x => x !== '')
        .join(this.config.separator)
}

TenseBuilder.prototype.join = function(extracted) {
    if(extracted.and.length === 0 && extracted.or.length === 0){
        return ''
    }

    const c = this.config.types[extracted.type]
    let and = ''
    if(extracted.or.length !== 0 && extracted.and.length !== 0){
        and = ' and '
    }
    const x = c.replace('%', `${extracted.or.map(x => x.word).join(' or ')}${and}${extracted.and.map(x => x.word).join(' and ')}`)
    return x
}

TenseBuilder.prototype.extract = function(parts, type) {
    const types = parts.filter(x => x.type === type)
    const and = types.filter(x => x.mood === 'and')
    const or = types.filter(x => x.mood === 'or')
    return {
        type,
        and,
        or,
    }
}

TenseBuilder.prototype.validate = function(parts) {
    const errors = []
    if(!Array.isArray(parts)){
        errors.push('1st parameters must be an array')
    }

    return errors
}

TenseBuilder.prototype.validateParse = function(tense) {
    const errors = []
    if(tense == null || typeof(tense) !== 'string'){
        errors.push('1st parameters must be an string')
    }

    return errors
}

module.exports = TenseBuilder