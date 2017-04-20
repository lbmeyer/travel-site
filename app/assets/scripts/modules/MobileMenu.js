import $ from 'jquery';

class MobileMenu {
	//constructor function will run immediately when a new object is created with this MobileMenu class
	constructor() {
		/* //This is spagetti jQuery. No the best way to write
		$(".site-header__menu-icon").click(function(){
			console.log("Hey");
		}); */
		
		this.siteHeader = $(".site-header");
		this.menuIcon = $(".site-header__menu-icon");
		this.menuContent = $(".site-header__menu-content");
		this.events(); //make browser listen for this event when page loads
	}
	
	events() {
		this.menuIcon.click(this.toggleTheMenu.bind(this));
		//by binding (this), the 'this' in toggleTheMenu will now have the same instance of 'this' in events()
	}
	
	toggleTheMenu() {
		this.menuContent.toggleClass("site-header__menu-content--is-visible");
		this.siteHeader.toggleClass("site-header--is-expanded");
		this.menuIcon.toggleClass("site-header__menu-icon--close-x");
	}
}

export default MobileMenu;