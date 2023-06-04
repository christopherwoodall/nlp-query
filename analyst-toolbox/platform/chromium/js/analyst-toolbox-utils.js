// TODO: Create Utils Class

HTMLElement.prototype.getNodes = function( type ) {
  return document.evaluate( type,
                            this,
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null );
};
//var result = document.body.getNodes("//text()");
//console.log( { len: result.snapshotLength, result: result } );

/************************************************************************/


/**
 * Search for nodes in a document fragment
 **/
function getNodes( node, type ) {
  var elements = [],
      i = 0,
      next = node.firstChild;
  while ((node = next)) {
    if ( node.nodeType === type ) elements[i++] = node;
    next = node.firstChild || node.nextSibling;
    while (!next && (node = node.parentNode)) next = node.nextSibling;
  }
  return elements;
}

// EXAMPLE
//var DOM   = new window.DocumentFragment().appendChild( document.body.cloneNode(true) ),
//    nodes = getNodes( DOM, 3 );
//console.log( { len: nodes.length, result: nodes } );

/************************************************************************/

/**
 * Search for elements by tag name in a document fragment.
 **/
var getElementsByTagName = function( node, tagName) {
  var elements = [],
      i = 0,
      anyTag = tagName === "*",
      next = node.firstChild;
  while ((node = next)) {
    if (anyTag ? node.nodeType === 1 : node.nodeName === tagName) elements[i++] = node;
    next = node.firstChild || node.nextSibling;
    while (!next && (node = node.parentNode)) next = node.nextSibling;
  }
  return elements;
};


/**
 * Search for nodes in a document fragment
 **/
function getNodes( node, type ) {
  var elements = [],
      i = 0,
      next = node.firstChild;
  while ((node = next)) {
    if ( node.nodeType === type ) elements[i++] = node;
    next = node.firstChild || node.nextSibling;
    while (!next && (node = node.parentNode)) next = node.nextSibling;
  }
  return elements;
}
// EXAMPLE
//var DOM      = new window.DocumentFragment().appendChild( document.body.cloneNode(true) ),
//    elements = getElementsByTagName( DOM, 'CENTER' );
//console.log( { len: elements.length, result: elements } );
