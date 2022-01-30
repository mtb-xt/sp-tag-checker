
const fn = require('../modules/checktags.js');
const each = require("jest-each").default;

describe("checkTags", () => {
  each([
    ['The following text<C><B>is centred and in boldface</B></C>', 'Correctly formatted line'],
    ['<B>This <\\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d>sentence ', 'Correctly formatted line'],
    ['<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C> ', 'Expected </C> found </B>'],
    ['<B>This should be in boldface, but there is an extra closing tag</B></C> ', 'Expected # found </C>'],
    ['</B>This should be in boldface, but there is only a closing tag', 'Expected # found </B>'],
    ['<B><C>This should be centred and in boldface, but there is a missing closing tag</C>', 'Expected </B> found #'],
    ['The <center> cannot hold it is too late. ', 'Correctly formatted line'],
    ['<A><X><B><C>This should be centred and in boldface, but there is a missing closing tag</C></B>', 'Expected </X> found #'],
  
  ]).it("when the input is '%s'", (text, expected) => {
    expect(fn.checkTags(text)).toBe(expected);
  });
});