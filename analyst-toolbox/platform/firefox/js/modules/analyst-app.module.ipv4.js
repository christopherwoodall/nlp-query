//'use strict';
//( function( /*root*/ ) {

/******************************************************************************/

//var AnalystToolbox = AnalystToolbox || { };
//AnalystToolbox.modules = AnalystToolbox.modules || [ ];

/******************************************************************************/

var IPv4 = { };

/******************************************************************************/

IPv4.filter = function( text ) {
  // TODO - is this a better filter?
  // /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gmi
  const filter = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\/?[0-9]?[0-9]?/gmi;
  if( text.search( filter ) == -1 ) return -1;
  return text.match( filter )[ 0 ];
}
/******************************************************************************/

IPv4.props = function( match ) {


}

/******************************************************************************/

IPv4.transform = function( node, match ) {
    // TODO - Custom trigger configuration
    var type = IPv4.isPrivate( match ) ? 'Private' : 'Public'
    node.setAttribute( 'data-analyst-toolbox-tooltip', type )
    return node
  }

/******************************************************************************/

IPv4.callback = function( event ) {
    var target = this.target = event.target
    var match  = this.match  = target.getAttribute( 'data-analyst-toolbox-match' )

    IPv4.address( match )
    IPv4.toggleModal( match )
  }

/******************************************************************************/

IPv4.address = function( address ) {
  // TODO - Count trailing 0s to determine CIDR
  let [ ip, cidr = 32 ] = address.split( '/' );
  let netmask = null,
      type    = null,
      owner   = null;
  console.log( address )
  console.log( ip )
  console.log( cidr )
};


/******************************************************************************/
/*
  ip2long: function( ip ) {
    var ip = ip.split( '.' ).map( Number );
    //return ( ip[0]<<24 ) + ( ip[1]<<16 ) + ( ip[2]<<8 ) + ( ip[3] );
    return 0x1000000 * ip[0] + 0x10000 * ip[1] + 0x100 * ip[2] + ip[3];
  },
  long2ip( long ) {
    a = (long & (0xff << 24)) >>> 24;
    b = (long & (0xff << 16)) >>> 16;
    c = (long & (0xff << 8)) >>> 8;
    d = long & 0xff;
    return [a, b, c, d].join('.')
  },
  mask2long: function( mask ) {  },
  long2mask: function( long ) {  },
  */
  IPv4.isPrivate = function( ip ) {
    var ip = ip.split( '.' ).map( Number ),
        list = [
      [0x0A000000, 0xFF000000], // 10.0.0.0/8
      [0x64400000, 0xFFC00000], // 100.64.0.0/10
      [0x7F000000, 0xFF000000], // 127.0.0.0/8
      [0xA9FE0000, 0xFFFF0000], // 169.254.0.0/16
      [0xAC100000, 0xFFF00000], // 172.16.0.0/12
      [0xC0A80000, 0xFFFF0000]  // 192.168.0.0/16
    ];
    ip   = 0x1000000 * ip[0] + 0x10000 * ip[1] + 0x100 * ip[2] + ip[3];
    if (ip < list[0][0])
    return false;

    // Binary search
    var x = 0, y = list.length, middle;
    while (y - x > 1) {
      middle = Math.floor((x + y) / 2);
      if (list[middle][0] < ip)
        x = middle;
      else
        y = middle;
    }

    // Match
    var masked = ip & list[x][1];
    return (masked ^ list[x][0]) == 0;
  }

/******************************************************************************/

IPv4.whois = function( ip ) {
  //console.log( `https://rdap-bootstrap.arin.net/bootstrap/ip/${ip}` )
  //console.log( `http://whois.arin.net/rest/ip/${ip}` )
  var whois = { };

  // TODO - move response var out of request scope.
  // var response = String;

  function readXML( value ) {

  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if( this.readyState == 4 && this.status == 200 ) {
      var response = this.responseText,
          parser = new DOMParser( ),
          xmlDoc = parser.parseFromString( response, "text/xml" );
      whois.start = xmlDoc.getElementsByTagName('startAddress')[0].childNodes[0].nodeValue
      whois.end   = xmlDoc.getElementsByTagName('endAddress')[0].childNodes[0].nodeValue
      whois.cidr  = xmlDoc.getElementsByTagName('cidrLength')[0].childNodes[0].nodeValue
      whois.desc  =  xmlDoc.getElementsByTagName('description')[0].childNodes[0].nodeValue
    }
  };
  xhttp.open("GET", `https://whois.arin.net/rest/ip/${ip}`, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send( );
  return whois
  }

/******************************************************************************/

IPv4.toggleModal = function( match ) {
  var modal = document.getElementById( 'analyst-toolbox' ),
      type  =  IPv4.isPrivate( match ) ? 'Private' : 'Public';

  // TODO - send IP to IPv4.props IOT generate this info
  var whois = IPv4.whois( match );

  const modal_content = `
  <div class="analyst-toolbox-modal-content">
  <h1>Analyst Toolbox</h1>
  <table class="analyst-toolbox-table">
    <tbody>
    <tr>
        <td>Address</td>
        <td>${match}</td>
      </tr>
      <tr>
        <td>Type</td>
        <td>${type}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>${whois.desc}</td>
      </tr>
      <tr>
        <td>CIDR</td>
        <td>${whois.cidr}</td>
      </tr>
      <tr>
        <td>Starting Address</td>
        <td>${whois.start}</td>
      </tr>
      <tr>
        <td>Ending Address</td>
        <td>${whois.end}</td>
      </tr>
    </tbody>
  </table>

  <div class="analyst-toolbox-modal-content-ext">
  <h3>External Tools</h3>
    <a href="https://search.arin.net/rdap/?query={match}" target="_blank" rel="noopener noreferrer">
      ARIN
    </a>
    <a href="http://whois.domaintools.com/${match}" target="_blank" rel="noopener noreferrer">
      Whois
    </a>

    <a href="https://otx.alienvault.com/indicator/ip/${match}" target="_blank" rel="noopener noreferrer">
      Aliven Vault
    </a>

    <a href="https://www.virustotal.com/en/ip-address/${match}/information/" target="_blank" rel="noopener noreferrer">
      Virus Total
    </a>

    <a href="https://bgp.he.net/ip/${match}" target="_blank" rel="noopener noreferrer">
      Hurricane Electric
    </a>
  </div>
  </div>
  `;
  modal.innerHTML = modal_content
  modal.toggleAttribute( "hidden" )
  }


/******************************************************************************/

//AnalystToolbox.modules.push( IPv4 )

/******************************************************************************/
//} )( );


/*******************************************************************************
    DO NOT:
    - Remove the following code
    - Add code beyond the following code
**/

void 0;
/******************************************************************************/
/******************************************************************************/
