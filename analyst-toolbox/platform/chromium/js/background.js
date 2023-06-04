import { Storage } from './analyst-toolbox.storage.js'

/*******************************************************************/

import { IPv4 } from "./modules/analyst-app.module.ipv4.js"

/*******************************************************************/

let running = true;

/*******************************************************************/

chrome.runtime.onMessage.addListener(
  function ( request, sender, sendResponse ) {
    let Store     = new Storage( ),
        whitelist = Store.get( `whitelist` );

    if( whitelist.some( rx => new RegExp( rx, 'gmi' ).test( request.location.href ) ) ) {
      if( !running ) return false;
      sendResponse( IPv4 )
      return true;
    }
  } );

/*******************************************************************/


