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
          let prevTag = (stack[i - 1] === undefined) ? '#' : `</${_tagName(stack[i - 1])}>`;
          return `Expected ${prevTag} found ${tags[i]}`
        }
      }
    }
  }

  if (stack.length === 0) {
    // stack self-annihilated, meaning we're good
    return "Correctly formatted line";
  } else {
    leftover = stack.pop();

    return (`Expected </${_tagName(leftover)}> found #`);
  }

};

function checkTags(paragraph) {
  const matchedTags = paragraph.match(TAG_MATCHER);
  return _checkTags(matchedTags);
};
