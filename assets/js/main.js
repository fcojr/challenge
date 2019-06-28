//const axios = require('axios');
numeral.locale('pt-br')
axios.get('assets/products.json')
    .then(res => {
        let data = res.data
        let section = document.querySelector('#products')
        data.map(item => {
            let productNode = `
                <div class='product'>
                    <img alt="Remover item do carrinho" title="Remover item do carrinho" class="remove-cart" src="./assets/img/remove-shopping-cart.png">
                    <div class="img-carousel">
                        ${item.images.map(image => 
                            `<img alt="${item.name}" src="${image.imageUrl}">`
                        ).join('')}
                    </div>
                    <h3>${item.name}</h3>
                    <span>${numeral(item.Value).format('$0,0.00')}</span>
                </div>
            `
            section.innerHTML += productNode
        })
        const products = document.querySelectorAll('.product')
        const removeIcon = document.querySelector
        products.forEach(function(product){
            product.addEventListener('click', function(e){
                if(e.target === product.querySelector('.remove-cart')){
                    removeProductFromCart(product)
                    return
                }
                addProductToCart(product)
            })
        })
    })
    
var addProductToCart = product => {
    const cart = document.querySelector('.cart-content span')
    if(product.classList.contains('on-cart')) return //do nothing if already on cart
    let cartValue = numeral(cart.textContent).value()
    cartValue += getProductValue(product)
    cart.innerHTML = numeral(cartValue).format('$0,0.00')
    product.classList.add('on-cart')
    alert(`Produto adicionado ao carrinho.`)
}

var removeProductFromCart = product => {
    const cart = document.querySelector('.cart-content span')
    let cartValue = numeral(cart.textContent).value()
    cartValue -= getProductValue(product)
    cart.innerHTML = numeral(cartValue).format('$0,0.00')
    product.classList.remove('on-cart')
    alert(`Produto removido do carrinho.`)
}

var getProductValue = product => {
    return numeral(product.querySelector('span').textContent).value()
}

/* Global */
window.onload = function(){
    /* Mobile menu */
    let menuIcon = document.querySelector('.fa-bars')
    let closeMenuIcon = document.querySelector('.fa-times')
    let nav = document.querySelector('nav')
    menuIcon.addEventListener('click', function() {
        nav.classList.add('active')
        closeMenuIcon.addEventListener('click', function() {
            nav.classList.remove('active')
        })
    })
    /* Initing the sliders */ 
    $('.img-carousel').slick({
        infinite: true,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    })
}