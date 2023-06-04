export class Storage {
  constructor( ) {

  }

  put( key, value ){
    if( typeof value !== `string` ) {
      try {
        value = JSON.stringify( value );
      } catch {
        console.log( `WARNING: Error saving ${ key }. Cannot stringify.` );
        return false;
      }
    }
    localStorage[ key ] = value;
  }

  get( key ) {
    return JSON.parse( localStorage[ key ] );
  }
}
