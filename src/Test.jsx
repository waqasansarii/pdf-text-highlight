// import React, { useCallback, useState } from 'react';
import { useCallback, useState } from 'react';
import { Document, Page } from 'react-pdf';

import samplePDF from './assets/nda.pdf';

function highlightPattern(text, pattern) {
  return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

export default function PDF() {
  const [searchText, setSearchText] = useState('');

  const textRenderer = useCallback(
    (textItem) => highlightPattern(textItem.str, searchText),
    [searchText]
  );

  function onChange(event) {
    setSearchText(event.target.value);
  }

  return (
    <>
      <Document file={samplePDF}>
        <Page
          pageNumber={1}
          customTextRenderer={textRenderer}
        />
      </Document>
      <div>
        <label htmlFor="search">Search:</label>
        <input type="search" id="search" value={searchText} onChange={onChange} />
      </div>
    </>
  );
}