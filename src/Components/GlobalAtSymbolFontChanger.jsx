import React, { useEffect } from 'react';

// Utility function to wrap @ symbols globally in text nodes
const wrapAtSymbol = () => {
  // Create a tree walker to go through all text nodes
  const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let currentNode;
  
  // Iterate over all text nodes
  while ((currentNode = textNodes.nextNode())) {
    const parentElement = currentNode.parentNode;
    
    // Check if the node contains an '@' symbol
    if (currentNode.nodeValue.includes('@')) {
      const originalText = currentNode.nodeValue;

      // Create a new span element to wrap the '@' symbol
      const newHTML = originalText.replace(/(@)/g, '<span class="at-symbol">@</span>');

      // Create a temporary container and set its innerHTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = newHTML;

      // Replace the current text node with the new nodes
      while (tempDiv.firstChild) {
        parentElement.insertBefore(tempDiv.firstChild, currentNode);
      }
      parentElement.removeChild(currentNode); // Remove the original text node
    }
  }
};

const GlobalAtSymbolFontChanger = () => {
  useEffect(() => {
    // Run the wrapAtSymbol function after the component mounts
    wrapAtSymbol();
  });

  return null; // No need to render anything
};

export default GlobalAtSymbolFontChanger;
