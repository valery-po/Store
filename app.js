console.log(3)


const productsEl = document.querySelector(".products-wrapper");
const cartItemsEl = document.querySelector('#header__cart-body');
const subtotalEl = document.querySelector('.subtotal');
const totalGoodsInCart = document.querySelector(".header__cart-items span")




if(cartItemsEl) {
const closeShopCart = document.querySelector('#header__cart-close');
const overlay = document.querySelector('.header__overlay');
const openShopCart = document.querySelector('.header__cart-image');

closeShopCart.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

openShopCart.addEventListener('click', () => {
	const cart = document.querySelector('.header__card');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling');
});

function closeCart() {
	const cart = document.querySelector('.header__card');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling')
}
}



  
  

function renderProducts() {

  products.forEach(product => {
     productsEl.innerHTML += `
    <div class="products-column">
            <article class="products-item">
              <a href="products.html" target="_blank"  class="products-item__image">
                <img src="${product.imgSrc}" alt="${product.name}">
              </a>
              <div class="products-item__content">
                <a href="products.html" class="products-item__link">
                  <h3 class="products-item__title">${product.name}</h3>
                  <span class="products-item__price">$${product.price}</span>
                </a>
                <p class="products-item__text">
                  ${product.description}
                </p>
                <div class="products-item__buttons">
                  <button class="product-item__button-view product-buttons">View</button>
                  <button class="product-item__button-basket product-buttons" onclick="addToCart(${product.id})">Add To Basket</button>
                </div>
              </div>
            </article>
     </div>`;
  });
  
}
renderProducts();



 



//ADD TO CART
//cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart()

function addToCart(id) {
  //check if product already exist in cart
  if(cart.some((product) => product.id === id)){
    changeNumberOfUinits('plus', id);
  } else {
    const item  = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    })
    console.log(cart);
  }

  updateCart();
}


//update cart

function updateCart(){
  renderCartItems();
  renderSubtotal();
  //save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

//calculate and render subtotal 

function renderSubtotal() {
  
  let totalPrice = 0;
  totalItems = 0;

  cart.forEach((item) => {
  totalPrice += (item.price * item.numberOfUnits);
  totalItems += item.numberOfUnits;
  });
    
    subtotalEl.innerHTML = `Subtotal:<span>$${totalPrice.toFixed(2)}</span>`;
    totalGoodsInCart.innerHTML = totalItems;


}

//render cart items

function  renderCartItems(){
 
  cartItemsEl.innerHTML = "";
  if(cart.length === 0){
    cartItemsEl.insertAdjacentHTML("beforeend", `
    <div id="cart-empty">
					Your shopping cart is empty
		</div>`
    )
  } else {
    cart.forEach((item) => {
    
      cartItemsEl.innerHTML += `
      <div class="products-column">
              <article class="products-item">
                <div class="products-item__image" onclick="removeItemFromCart(${item.id})">
                  <img  src="${item.imgSrc}" alt="${item.name}">
               </div>
                <div class="products-item__content">
                  <a href="products.html" class="products-item__link">
                    <h3 class="products-item__title">${item.name}</h3>
                    <span class="products-item__price">$${item.price}</span>
                 </a>
                 <div class="units">
                   <div class="btnka minus" onclick="changeNumberOfUinits('minus', ${item.id})">-</div>
                   <div class="number">${item.numberOfUnits}</div>
                   <div class="btnka plus" onclick="changeNumberOfUinits('plus', ${item.id})">+</div>           
                </div>
                </div>
              </article>
       </div>`
    })
  }
  

 
}

//remove item from cart

function removeItemFromCart(id){
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}


// change number of units for an item

function changeNumberOfUinits(action, id){
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if(item.id === id){
      if(action === 'minus' && numberOfUnits > 1) {
        numberOfUnits--;
        
      } else if(action === 'plus' && numberOfUnits < item.instock) {
        numberOfUnits++;
      } 
    }

    return {
      ...item,
      numberOfUnits,
    };
   
  });
  updateCart();
}
                  
                  
//Search button click

document.querySelector(".search-button").addEventListener("click", (e) => {
    e.preventDefault();
  //Inisializations
  
  let searchInput =  document.querySelector(".search-input").value;
  let elements =  document.querySelectorAll(".products-item__title");
 
  let cards = document.querySelectorAll(".products-column");
  
  
  //loop through all elements 
  elements.forEach((element, i) =>{
    if(element.innerText.includes(searchInput.toUpperCase().slice(0, 1))){
      cards[i].classList.remove("hide");
    } else {
      cards[i].classList.add("hide");
    }
  });
  
})


