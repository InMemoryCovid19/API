const pug = require("pug");
// Compile the source code
// const compiledFunction = pug.compileFile('./template.pug');
const compiledFunction = pug.compile(
`doctype html
html(lang="en")
    head
    title(#{name})
    body
    div(id="header_wrap" class="outer")
        div
            h1 #{name}
        div
        h1 #{birthdate} to #{deathdate}
    div(id="main_content_wrap" class="outer")
        section #{words}`);

// Render a set of data
exports.compile = function (params) {
  return compiledFunction({params})
};
// "<p>Timothy's Pug source code!</p>"

// Render another set of data
// console.log(compiledFunction({
//   name: 'Forbes'
// }));
// "<p>Forbes's Pug source code!</p>"
