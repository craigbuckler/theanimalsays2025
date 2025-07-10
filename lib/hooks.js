// function hooks

// processContent hook: replace markdown "::: tag" with HTML tags
export function htmlBlocks( data ) {

  data.content = data.content
    .replace(/((<.+?>){0,1}\s*:::(.+?)(<\/.+?>){0,1}\n)/gi, (m, p1, p2, p3, p4, pos, str) => {

      // tag offset
      pos += (p2 || '').length + 3;

      if (str.lastIndexOf('<code', pos) > str.lastIndexOf('</code', pos)) {

        // inside a code block - no change
        return p1;

      }
      else {

        // replace ::: tag and smart quotes with HTML
        let tag = `<${
          p3.trim()
            .replace(/[\u2018\u2019]/g, '\'')
            .replace(/[\u201C\u201D]/g, '"')
        }>\n`;

        // swap outer tags
        if (!p2 || !p4) {
          tag = (p4 || '') + tag + (p2 || '');
        }

        return tag;

      }
    });

}


// processPostRender hook: add further HTML meta data
export function postrenderMeta( output, data ) {
  if (data.isHTML && data.template !== 'redirect.html') {
    output = output.replace('</head>', '<meta name="generator" content="Publican.dev">\n</head>');
  }
  return output;
}
