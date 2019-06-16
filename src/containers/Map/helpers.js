export function mapOptionsResponseToDisplay(optionKey, response) {
  switch (optionKey) {
    case 'kecamatan':
      return response.map(opt=>({
        value:opt.idkecm,
        label:opt.nmkecm
      }))
    case 'sungai':
    return response
    // case 'nationality':
    //   return response.map(opt => ({
    //     value: opt.isoCode,
    //     title: opt.en,
    //   }));
    default:
      return response;
      // return response.map(opt => ({
      //   value: opt.code,
      //   title: opt.en,
      // }));
  }
}

//https://gist.github.com/henrahmagix/4740707
export function colorToRGBArray(color, alpha) {
  // Always return an array, either empty or filled.
  var rgb = [];
  var hex;

  // Get an array of rgb(a) values.
  if (color.substr(0, 1) === '#') {
      /* HEX STRING */
      // If the first character is # we're dealing with a hex string. Get
      // an array of each character. This is more explicit than dealing
      // with the indices of a String object due to all other instances
      // of hex in this function.
      hex = color.substr(1).split('');
      if (hex.length === 3) {
          // If this is a 3-char color, e.g. #f00, make it 6 characters
          // by duplicating each one.
          hex = [hex[0], hex[0], hex[1], hex[1], hex[2], hex[2]];
      }
      if (hex.length === 6) {
          // Only deal with 6-char hex colors when computing the rgb
          // array. Anything else at this point has been passed
          // incorrectly.
          var i = 0;
          var x = 0;
          var hexStr;
          // Convert each hex pair (represented by hexStr) into a decimal
          // value to go in rgb[]. i is the rgb[] index whilst x is 2i,
          // which translates Array(3) to Array(6).
          while (i < 3) {
              hexStr = hex[x] + hex[x + 1];
              rgb[i] = parseInt(hexStr, 16);
              i += 1;
              x = i * 2;
          }
      }
  } else if (color.search(/rgb/) !== -1) {
      /* RGB(A) STRING */
      rgb = color.match(/([0-9]+\.?[0-9]*)/g);
  }

  // Add or remove the alpha value.
  if (alpha && rgb.length === 3) {
      // If an alpha value has been requested and there currently isn't
      // one, add 1 as the alpha value.
      rgb.push(1);
  } else if (! alpha && rgb.length === 4) {
      // Otherwise if there's an alpha value that hasn't been requested,
      // remove it.
      rgb.pop();
  }

  // Ensure all values in rgb are decimal numbers, not strings.
  for (var j = 0; j < rgb.length; j++) {
      rgb[j] = parseInt(rgb[j], 10);
  }

  return rgb;
}

// http://mapsam.com/posts/looping-geojson
export function parseProjectData(data){
  var geojson = {};
  geojson['type'] = 'FeatureCollection';
  geojson['features'] = [];

  for(var k in data){
    var newFeature = {
      "type": "Feature",
      "geometry":{
        "type":"Point",
        "coordinates": [parseFloat(data[k].longitude),parseFloat(data[k].latitude)]
      },
      "properties":{
        "contoh_prop":data[k].kolom,
        "contoh_prop2":data[k].kolom2,
      }
    }
    geojson['features'].push(newFeature);
  }

  return geojson;
}