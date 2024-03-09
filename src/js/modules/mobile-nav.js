function mobileNav() {
	// Mobile nav button
	const navBtn = document.querySelector('.mobile-nav-btn');
	
	const nav = document.querySelector('.mobile-nav');
	
	const menuIcon = document.querySelector('.nav-icon');
	const header = document.querySelector('.header');
	const menuLinkls = document.querySelectorAll('.mobile-nav_link')

	
		menuLinkls.forEach((item, index) => {
			item.addEventListener('click',() => {
				console.log(11)
			  nav.classList.toggle('mobile-nav--open');
			  header.classList.toggle('header-mobile');
			});
		});

	navBtn.onclick = function () {
		nav.classList.toggle('mobile-nav--open');
		menuIcon.classList.toggle('nav-icon--active');
		document.body.classList.toggle('no-scroll');
		header.classList.toggle('header-mobile');
	};
	
 
	
}

export default mobileNav;