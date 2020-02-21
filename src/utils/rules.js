export default [
    {
        description: 'Replace L with R',
        find: /l/gi,
        replace: function () {
            return 'r'
        },
    },
    {
        description: 'Replace J with I',
        find: /j/gi,
        replace: function () {
            return 'y'
        },
    },
    {
        description: 'VI to BI when word starts with VI',
        find: /^vi/gi,
        replace: function () {
            return 'bi'
        },
    },
    {
        description: 'Add U between to vowels',
        find: /(b|d|f|g|h|j|k|l|m|p|q|r|s|t|v|x|z){2}/gi,
        replace: function (match) {
            return match[0] + 'u' + match[1]
        },
    },
    {
        description: 'CK to KK',
        find: /(ck|ch)/gi,
        replace: function () {
            return 'kk'
        },
    },
    {
        description: 'Adding U to words ending with other vowels',
        find: /(b|d|f|g|h|j|k|l|m|p|q|r|s|v|x|z)$/gi,
        replace: function (match) {
            return match + 'u'
        }
    },
    {
        description: 'Adding O to words ending with T',
        find: /t$/gi,
        replace: function (match) {
            return match + 'o'
        },
    },
]
