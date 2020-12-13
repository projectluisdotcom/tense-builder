class TenseBuilder {
    config = {
        types: {
            subject: '%',
            what: ' with %',
            where: ' ubicated in %',
        },
        separator: ' ',
    }

    build(parts) {
        const errors = this.validate(parts).length
        if(errors !== 0){
            throw new Error(errors)
        }

        const subject = this.extract(parts, 'subject')
        const what = this.extract(parts, 'what')
        const where = this.extract(parts, 'where')

        return `${this.join(subject)}${this.join(what)}${this.join(where)}`.split(' ').join(this.config.separator)
    }

    join(extracted) {
        const c = this.config.types[extracted.type]
        let and = ''
        if(extracted.or.length !== 0 && extracted.and.length !== 0){
            and = ' and '
        }
        const x = c.replace('%', `${extracted.or.map(x => x.word).join(' or ')}${and}${extracted.and.map(x => x.word).join(' and ')}`)
        return x
    }

    extract(parts, type) {
        const types = parts.filter(x => x.type === type)
        const and = types.filter(x => x.mood === 'and')
        const or = types.filter(x => x.mood === 'or')
        return {
            type,
            and,
            or,
        }
    }

    validate(parts){
        const errors = []
        if(!Array.isArray(parts)){
            errors.push('1st parameters must be an array')
        }

        return errors
    }
}

module.exports = TenseBuilder;