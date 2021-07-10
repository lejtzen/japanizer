import rules from '@/utils/rules.js'

export default function (text) {
    let separator = ' '
    let words = text.split(separator)

    return words
        .map((word, index) => {
            let original = word

            rules.forEach((rule) => {
                word = word.replace(rule.find, (match) => {
                    return rule.replace(match)
                })
            })

            return word
        })
        .join(separator)
}
