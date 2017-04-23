import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
	constructor() {
		this.lazyImages = $(".lazyload");
		this.siteHeader = $(".site-header");
		this.headerTriggerElement = $(".large-hero__title");
		this.createHeaderWaypoint();
		this.pageSections = $(".page-section");
		this.headerLinks = $(".primary-nav a");
		this.createPageSectionWaypoints();
		this.addSmoothScrolling();
		this.refreshWaypoints(); 
	}
	
	refreshWaypoints() {
		this.lazyImages.on("load", function() {
			Waypoint.refreshAll();
		}); 
	} // Waypoint object exists in browser's global window scope, hence Waypoint.refreshAll() applies globally (don't need this method in RevealOnScroll.js)
	
	addSmoothScrolling() {
		this.headerLinks.smoothScroll();
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
	
	createPageSectionWaypoints() {
		var that = this;
		this.pageSections.each(function() {
			var currentPageSection = this;
//			console.log(currentPageSection);
			new Waypoint({
				element: currentPageSection,
				handler: function(direction) {
					if(direction == "down") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					}
				},
				offset: "18%"
			});
			
			new Waypoint({
				element: currentPageSection,
				handler: function(direction) {
					if(direction == "up") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					}
				},
				offset: "-40%"
			});
		});
	}
}

export default StickyHeader; 