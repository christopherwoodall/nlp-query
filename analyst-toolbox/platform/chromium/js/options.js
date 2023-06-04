import { Storage } from './analyst-toolbox.storage.js'

/*******************************************************************/

let elemURL  = document.getElementById( `url-list` ),
    elemSave = document.getElementById( `save` ),
    Store    = new Storage( );


/*******************************************************************/

var URL = { };

URL.parse = function( data ) {
  let urls      = data.split( '\n' ),
      whitelist = JSON.stringify( urls );
  console.log( `Analyst Toolbox: Saving ${ whitelist }` )
  Store.put( `whitelist`, whitelist )
};

URL.get = function( ) {
  let data = Store.get( `whitelist` );
  elemURL.value = data.join( `\n` );
};

/*******************************************************************/

window.addEventListener( "load", function( ) {
  // Populate settings
  URL.get( );

  // Attach listeners
  elemSave.addEventListener( `click`, function( ) {
    URL.parse( `${ elemURL.value }` );
  } );

} );
