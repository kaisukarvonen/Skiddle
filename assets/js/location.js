
var onLocationSuccess = function(position) {
        getCountrycode(position.coords.latitude, position.coords.longitude);

    };

    // onError Callback receives a PositionError object
    //
function onLocationError(error) {
     console.log('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }


	
function getCountrycode(lat, lng) {
	grid = codegrid.CodeGrid();
	grid.getCode(lat, lng, function (error, code) {
		if (error) {
			console.log("Error: could not get country code");
		}
		sessionStorage.setItem('countrycode', code);
		
		$.ajax({
			type: 'HEAD',
			url: 'http://scoctail.com/location-'+code+'-words.txt',
			success: function() {
				sessionStorage.setItem('countryIsValid', "true");
				console.log("current countrycode: " + sessionStorage.getItem("countrycode")+", valid?:true");
			},
			error: function() {
				sessionStorage.setItem('countryIsValid', "false");
				console.log("current countrycode: " + sessionStorage.getItem("countrycode")+", valid?:false");
			}

		});
		
	});
}