import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
	constructor(els, offset) {
		this.itemsToReveal = els;
		this.offsetPercentage = offset;
		this.hideInitially();
		this.createWaypoints();
		
//		console.log(this);
	}
	
	hideInitially() {
		this.itemsToReveal.addClass("reveal-item");
	}
	
	createWaypoints() {
		var that = this;
//		console.log(that);
		
		this.itemsToReveal.each(function() {
			console.log(this);
			var currentItem = this;
			new Waypoint({
				element: currentItem,
				handler: function() {
					$(currentItem).addClass("reveal-item--is-visible");
				},
				offset: that.offsetPercentage
			});
		});
	}
	
}

export default RevealOnScroll;