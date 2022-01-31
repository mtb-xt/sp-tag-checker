// local exec script for tag checker implementation, just uses all test strings from 'tests' array
const fn = require('./modules/checktags.js');

const tests = [
  'The following text<C><B>is centred and in boldface</B></C>',
  '<B>This <\g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence ',
  '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C> ',
  '<B>This should be in boldface, but there is an extra closing tag</B></C> ',
  '</B>This should be in boldface, but there is only a closing tag',
  '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>',
  'The <center> cannot hold it is too late. ',
  '<A><X><B><C>This should be centred and in boldface, but there is a missing closing tag</C></B>',
  '<P>Hello</p>'
]

for (const testline of tests) {
  console.log(testline);
  console.log(fn.checkTags(testline));
}