// Finds and returns the page element that currently has focus. Drills down into
// iframes if necessary.
function findFocusedElem(document) {
  var focusedElem = document.activeElement;

  // If the focus is within an iframe, we'll have to drill down to get to the
  // actual element.
  while (focusedElem && focusedElem.contentDocument) {
    focusedElem = focusedElem.contentDocument.activeElement;
  }

  // There's a bug in Firefox/Thunderbird that we need to work around. For
  // details see https://github.com/adam-p/markdown-here/issues/31
  // The short version: Sometimes we'll get the <html> element instead of <body>.
  if (focusedElem instanceof document.defaultView.HTMLHtmlElement) {
    focusedElem = focusedElem.ownerDocument.body;
  }

  return focusedElem;
}

// Assigning a string directly to `element.innerHTML` is potentially dangerous:
// e.g., the string can contain harmful script elements. (Additionally, Mozilla
// won't let us pass validation with `innerHTML` assignments in place.)
// This function provides a safer way to append a HTML string into an element.
function saferSetInnerHTML(parentElem, htmlString) {
  // Jump through some hoops to avoid using innerHTML...
  debugger;
  console.log("parent eleme: " + parentElem);
  console.log("parent ownerDocument: " + parentElem.ownerDocument);
  var range = parentElem.ownerDocument.createRange();
  range.selectNodeContents(parentElem);

  var docFrag = range.createContextualFragment(htmlString);
  console.log("docFrag: " + docFrag);

  range.deleteContents();
  console.log("docFrag: " + docFrag);
  range.insertNode(docFrag);
  range.detach();
};


self.on("click", function (node, data) {
  console.log("in click");
  var found = findFocusedElem(document);
  var scrollPos = found.scrollTop;
  var strPos = found.selectionStart;
  var front = (found.value).substring(0, strPos);  
  var back = (found.value).substring(strPos, found.value.length); 
  // found.value = front + data + back;
  saferSetInnerHTML(found, front + data + back);
  found.selectionStart = strPos;
  found.selectionEnd = strPos + data.length;
  found.focus();
  found.scrollTop = scrollPos;
  console.log("[content script] node: " + node.innerHTML);
  console.log("[content script] strPos: " + strPos);
  console.log("[content script] data: " + data);  
  //self.postMessage([node, found]);
});

// self.on("context", function (node) {
//  console.log("in context");
//     console.log(node.nodeName);
//     self.postMessage([node]);
//     return true;
//  });