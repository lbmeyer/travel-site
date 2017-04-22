import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
	constructor() {
		this.siteHeader = $(".site-header");
		this.headerTriggerElement = $(".large-hero__title");
		this.createHeaderWaypoint();
	}

	createHeaderWaypoint() {
		//save this to that so we can reference instance of StickyHeader class in new Waypoint object
		var that = this;
		new Waypoint({
			// waypoints is expecting a javascript native DOM element here (headerTriggerElementis currently a jquery object). So we can just add [0] to end because the first item in a jquery array like object is always a pointer to the native DOM element
			element: this.headerTriggerElement[0],
			handler: function(direction) {
				if(direction == "down") {
					that.siteHeader.addClass("site-header--dark");
				} else {
					that.siteHeader.removeClass("site-header--dark");
				}
			}
		});
	}
}

export default StickyHeader;