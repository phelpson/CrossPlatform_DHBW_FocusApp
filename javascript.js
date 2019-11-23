console.log("Running.");

var slider = new Slider('#coffeeRange', {
	formatter: function(value) {
		return 'Current value: ' + value;
	}
});