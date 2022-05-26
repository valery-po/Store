const workImages = document.querySelector('.product-image__slider');

if (workImages) {
  const workSlider = new Swiper('.product-image__nav', {
    spaceBetween: 20,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: true
   
  });
  const workSlidesNav = new Swiper(workImages, {
    spaceBetween: 20,
    slidesPerView: 1,
    autoplay: true,
  
    thumbs: {
      swiper: workSlider,
    },
  });
}


const selectAllElements = document.querySelectorAll("[data-select]");
const infoSelect = document.querySelector(".info-select");
const infoTitle = document.querySelector(".header-select__title");

 if(infoSelect){
  infoSelect.addEventListener("click", () => {
  infoTitle.classList.toggle("header-select__title--active");

  });
 }



selectAllElements.forEach(function (item) {

	item.addEventListener("click", function () {

		const realSelect = this.nextElementSibling;

		if (event.target.hasAttribute("data-select-item")) {

			var itemTitle = event.target.getAttribute("data-select-item");

			this.querySelector("[data-select-title]").textContent = itemTitle;

			this.querySelector(".info-select__dropdown").classList.toggle("hidden");
 
} else {

			this.querySelector(".info-select__dropdown").classList.toggle("hidden");
    }
 })

})

// JQuery animation  //

 

let animTime = 2000;
  $(".someDiv").on("click", function(e){
  e.preventDefault();
  


	
let modal = $("#modalDiv");

modal.css("top",(window.innerHeight - modal.height()) / 2);
modal.css("left",(window.innerWidth - modal.width()) / 2);
modal.css("background-image", $(e.target).css("background-image"));
modal.fadeIn(animTime);

});

$("#modalDiv").on("click", function(e){
	
	$(this).fadeOut(animTime);
	
	
});

	  $("body").on("click", function(e){
   	$("#modalDiv").fadeOut(6000);
 });


//jQuery animation//
















