module.exports = {
  checkTags: checkTags
}

const TAG_MATCHER = /<\/?[A-Z]>/g;

const _tagType = (tag) => {
  return tag[1] === '/' ? 'close' : 'open';
}

const _tagName = (tag) => {
  if (tag != undefined) {
    return tag.replace(/[<>/]/g, '');
  }
}

const _checkTags = (tags) => {
  // impl goes here
  // console.log('input');
  console.log(tags);

  const stack = [];
  if (tags === null) {
    return "Correctly formatted line";
  } else {
    for (let i = 0; i < tags.length; i++) {
      if (_tagType(tags[i]) === 'open') {
        stack.push(tags[i]);
      } else {
        if (_tagName(tags[i]) === _tagName(stack[stack.length - 1])) {
          stack.pop();
        } else {
          stack.push(tags[i]);
        }
      }
    }
  }
  console.log(stack);

  if (stack.length === 0) {
    // stack self-annihilated, meaning we're good
    return "Correctly formatted line";
  } else if ((stack.length === 1)) {
    // one item left, it's hashing time!
    leftover = stack.pop();
    leftoverName = _tagName(leftover);
    return (_tagType(leftover) === 'open' ? `Expected </${leftoverName}> found #` : `Expected # found </${leftoverName}>`);
  } else {
    // Unmatched tag mess remains, let's find last one
    for (let i = stack.length - 1; i >= 0; i--) {
      console.log(stack[i]);
      if (_tagType(stack[i]) === 'open') {
        // Now this really looks like a case of the above 'else' - ideally, figure out a way to combine them ಠ_ಠ
        let prevTag = (stack[i+1] === undefined) ? '#' : `</${stack[i+1]}>`;
        return `Expected </${_tagName(stack[i])}> found ${prevTag}`;
      }
    }
  }
};

function checkTags(paragraph) {
  const matchedTags = paragraph.match(TAG_MATCHER);
  return _checkTags(matchedTags);
};

// checkTags('<P>Hello</p>');


// // Language: javascript
// const tests = [
//   'The following text<C><B>is centred and in boldface</B></C>',
//   '<B>This <\g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence ',
//   '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C> ',
//   '<B>This should be in boldface, but there is an extra closing tag</B></C> ',
//   '</B>This should be in boldface, but there is only a closing tag',
//   '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>',
//   'The <center> cannot hold it is too late. '
// ]

// for (const testline of tests) {
//   console.log(testline);
//   console.log(checkTags(testline));
// }