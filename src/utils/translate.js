import rules from '@/utils/rules.js'

const isUpperCase = (input) => {
    return input === input.toUpperCase()
}

const capitalize = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1)
}

export default function (text) {
    let separator = ' '
    let words = text.split(separator)

    return words
        .map((word) => {
            rules.forEach((rule) => {
                word = word.replace(rule.find, (match) => {
                    const result = rule.replace(match)

                    if (isUpperCase(match[0])) {
                        return capitalize(result)
                    }

                    return result
                })
            })

            return word
        })
        .join(separator)
}
