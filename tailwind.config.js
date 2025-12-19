/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html","./Other.html","./**/*.html","./scripts/**/*.js"],
    corePlugins:{ preflight:false },
    theme:{
        extend:{
            fontFamily: {
                special: ['"Special Gothic Condensed One"', 'sans-serif']
            },
            colors:{}
        }
    },
    plugins:[]
}