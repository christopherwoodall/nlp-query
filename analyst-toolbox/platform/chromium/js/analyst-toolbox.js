/*******************************************************************************
    Analyst Toolbox - a browser extension to enrich data.
    Copyright (C) 2021 Christopher Woodall

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://gitlab.devforce.disa.mil/cwoodall/analyst-toolbox
*/

'use strict';
( ( ) => {
/******************************************************************************/

var AnalystToolbox = AnalystToolbox || { };
AnalystToolbox.modules = AnalystToolbox.modules || [ ];

/******************************************************************************/

AnalystToolbox.Core = class {
  constructor( options ) {
    this.modules = [ ];

    Object.entries( options ).map( ( [ key, value ], i ) => { this[ key ] = value } )

    var modal = this.createElement(
      "div", {
        'id':     'analyst-toolbox',
        'hidden': ''
      }
    );
    modal.onclick = function( event ) {
      if( event.target.id == "analyst-toolbox" ) {
        event.target.toggleAttribute( "hidden" )
      }
    }
    document.body.insertBefore( modal, document.body.lastChild.nextSibling );
  }

  /************
   *
   *****/
  createElement( elem, options ) {
    var element = document.createElement( elem );
    Object.entries( options ).map( ( [ key, value ], i ) => {
      element.setAttribute( key, value )
    } )
    return element
  }

  /************
   *
   *****/
  inspect( node ) {
    var that    = this,
        modules = this.modules;
    const blacklist = [
      "html", "head",  "title", "meta", "style", "script", "link",
      "input", "textbox", "br" ];
    function scan( node ) {
      if( blacklist.includes( node.nodeName.toLowerCase( ) ) ) {
        node.setAttribute( 'data-analyst-toolbox', 1 );
        return;
      }

      // TODO - Do not tag Elements inside our Modal
      //if( node.id === "analyst-toolbox" ) return;

      if( node.nodeType !== 3) {
        if( !node.hasChildNodes( ) ) return;
          node.childNodes.forEach( child => { scan( child ) } );
          node.setAttribute( 'data-analyst-toolbox', 1 );
        }
      modules.forEach( module => {
        try {
          // TODO- Check if parent element has already been tagged.
          if( node.parentNode.getAttribute( 'data-analyst-toolbox' ) == "1" ) return;
          //if( node.textContent.search( module.filter ) == -1 ) return;
          if( module.filter( node.textContent ) === -1 ) return;
          if( node.nodeType === 3) {
            that.tag( node, module.filter, module.transform, module.callback )
          }
        } catch( error ) {
          return;
        }
        // Execute last item logic
        //if ( Object.is( module.length - 1, key ) ) { }
      } )
    }
    scan( node )
  }

  /************
   *
   *****/
  tag( node, filter, transform, callback ) {
    var text = node.textContent,
    match    = filter( text ),
    loc      = text.lastIndexOf( match ) + match.length,
    act      = node.splitText( loc ),
    parent   = node.parentElement,
    target   = parent,
    trigger  = transform( this.trigger( match, callback ), match )

    if( parent.tagName.toLowerCase( ) === "a" ) {
      node.parentElement.insertAdjacentElement( 'afterend', trigger );
    } else {
      node.parentElement.insertBefore( trigger, act );
    }
    return
  }

  /************
   *
   *****/
  trigger( match, callback ) {
    var trigger = this.createElement(
      'a',
      {
        'data-analyst-toolbox-trigger': 0,
        'data-analyst-toolbox-match':   match,
        'class': 'analyst-toolbox-trigger'
      }
    );
    trigger.textContent = "🚨"
    trigger.addEventListener( "click", callback, false );
    return trigger
  }
};

/******************************************************************************/

function run( config ) {
  console.log( config )
  var AnalystApp = new AnalystToolbox.Core( config )
    modules: [ ]
    //modules: [ IPv4 ]
    //modules: [ Domain, IPv4 ]
    //modules: [ ...AnalystToolbox.modules ]

    /***************************************/
    AnalystApp.inspect( document.body )
    /***************************************/

    let options = {
      childList: true,
      attributes: false,
      characterData: false,
      subtree: true,
      //attributeFilter: ['one', 'two'],
      attributeOldValue: false,
      characterDataOldValue: false
    },
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
    mutationObserver = new MutationObserver( mutation => {
      mutation.forEach( record => {
        if( !record.addedNodes.length ) return;
          record.addedNodes.forEach( node => {
            AnalystApp.inspect( node )
          } )
        } )
      } );

    mutationObserver.observe( document.body, options )
    /***************************************/
}

/******************************************************************************/

var toggle = function( ) {

  var init = (
    function( message ) {
      chrome.extension.sendMessage(
        message,
        response => {
          run( response )
        }
      );
  } )( { "location": window.location } );
  return
}

/******************************************************************************/

// TODO: Add to a utils class
HTMLElement.prototype.getNodes = function( type ) {
  return document.evaluate( type,
                            this,
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null );
};

/******************************************************************************/

window.addEventListener( "load", function( ) {
  console.log( "Analyst Toolbox" )

  // TODO - Check if we are in a supported web app
  
  // TODO: have background script inject module code
  //toggle( );

  // TODO: Use getNode prototype
  //var result = document.body.getNodes("//text()");
  //console.log( { len: result.snapshotLength, result: result } );
  
  var AnalystApp = new AnalystToolbox.Core( { modules: [ IPv4 ] } )

    /***************************************/
    AnalystApp.inspect( document.body )
    /***************************************/

    let options = {
      childList: true,
      attributes: false,
      characterData: false,
      subtree: true,
      //attributeFilter: ['one', 'two'],
      attributeOldValue: false,
      characterDataOldValue: false
    },
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
    mutationObserver = new MutationObserver( mutation => {
      mutation.forEach( record => {
        if( !record.addedNodes.length ) return;
          record.addedNodes.forEach( node => {
            AnalystApp.inspect( node )
          } )
        } )
      } );

    mutationObserver.observe( document.body, options )
  
} )

/******************************************************************************/
} )( );


/*******************************************************************************
    DO NOT:
    - Remove the following code
    - Add code beyond the following code
**/

void 0;
