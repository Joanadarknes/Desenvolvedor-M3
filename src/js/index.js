const filtro50 = document.getElementById('preco-1');
const filtro150 = document.getElementById('preco-2');
const filtro300 = document.getElementById('preco-3');
const filtro500 = document.getElementById('preco-4');
const filtro01 = document.getElementById('preco-5');
const filtrosCor = document.querySelectorAll('.filtro-cor');
const filtrosTamanho = document.querySelectorAll('.filter-tamanho button');
const filtrosPreco = document.querySelectorAll('.filtro-Preco');

let filtroCor = '';
let filtroTamanho = '';
let filtroPreco = '';

const filtrosDoCor = [];
const filtrosDeTamanho = [];

filtrosCor.forEach(filtro => {
  filtro.addEventListener('change', function (e) {
    if (e.target.checked === true) {
      filtrosDoCor.push(e.target.value);
      filtrar(filtrosDoCor, filtrosDeTamanho);
    } else {
      filtrosDoCor.forEach((cor, index) => {
        if (filtrosDoCor[index] === e.target.value) {
          filtrosDoCor.splice(index, 1);
        }
      });
      filtrar(filtrosDoCor, filtrosDeTamanho);
    }
  });
});

filtrosTamanho.forEach(filtro => {
  filtro.addEventListener('click', function (e) {
    if (!e.target.classList.contains('active')) {
      e.target.classList.add('active');
      filtrosDeTamanho.push(e.target.innerText);
      filtrar(filtrosDoCor, filtrosDeTamanho);
    } else {
      e.target.classList.remove('active');
      filtrosDeTamanho.forEach((tamanho, index) => {
        if (filtrosDeTamanho[index] === e.target.innerText) {
          filtrosDeTamanho.splice(index, 1);
        }
      });
      filtrar(filtrosDoCor, filtrosDeTamanho);
    }
  });
});

function filtrar(cor, tamanho) {
  fetch('http://localhost:5000/products').then(res => res.json()).then(json => {
    let resultadoFiltrado = [];
    // resultadoFiltrado = json.filter(item => filtroCor ? item.color === filtroCor : null);
    json.forEach(item => {
      if (cor.length > 0 && tamanho.length > 0) {
        if (cor.includes(item.color)) {
          item.size.forEach(size => {
            if (tamanho.includes(size)) {
              if (!resultadoFiltrado.includes(item)) {
                resultadoFiltrado.push(item);
              }
            }
          });
        }
      } else if (cor.length > 0 || tamanho.length > 0) {
        if (cor.includes(item.color)) {
          if (!resultadoFiltrado.includes(item)) {
            resultadoFiltrado.push(item);
          }
        }
        item.size.forEach(size => {
          if (tamanho.includes(size)) {
            if (!resultadoFiltrado.includes(item)) {
              resultadoFiltrado.push(item);
            }
          }
        });
      }
    });

    const shopContent = document.querySelector('.shop-content');
    shopContent.innerHTML = '';

    if (resultadoFiltrado.length !== 0) {
      resultadoFiltrado.forEach((item, index) => {
        const htmlDoItem = `
                  <div class="product-box" id="product-box-` + index + `">
                    <img src="` + item.image + `" alt="` + item.name.toUpperCase() + `" class="product-img">
                    <div class="product-box__info">
                    <h2 class="product-title">` + item.name.toUpperCase() + `</h2>
                    <div class="product-box__price">
                      <span class="price">R$ ` + item.price.toFixed(2).replace('.', ',') + `</span>
                      <p>até ` + item.parcelamento[0] + `x de R$` + item.parcelamento[1].toFixed(2).replace('.', ',') + `</p>
                    </div>
                    <button data-product-id="product-box-` + index + `" class="botao-comprar" data-add-product >COMPRAR</button>
                    </div>
                  </div>
              `;

        console.log('item COR', item.color);

        shopContent.innerHTML += htmlDoItem;
      });
    } else if (resultadoFiltrado.length === 0 && tamanho.length === 0 && cor.length === 0) {
      json.forEach((item, index) => {
        const htmlDoItem = `
                <div class="product-box" id="product-box-` + index + `">
                    <img src="` + item.image + `" alt="` + item.name.toUpperCase() + `" class="product-img">
                    <div class="product-box__info">
                    <h2 class="product-title">` + item.name.toUpperCase() + `</h2>
                    <div class="product-box__price">
                        <span class="price">R$ ` + item.price.toFixed(2).replace('.', ',') + `</span>
                        <p>até ` + item.parcelamento[0] + `x de R$` + item.parcelamento[1].toFixed(2).replace('.', ',') + `</p>
                    </div>
                    <button data-product-id="product-box-` + index + `" class="botao-comprar" data-add-product>COMPRAR</button>
                    </div>
                </div>
            `;

        shopContent.innerHTML += htmlDoItem;
      });
    } else {
      resultadoFiltrado.forEach((item, index) => {
        const htmlDoItem = `
                  <div class="product-box" id="product-box-` + index + `">
                    <img src="` + item.image + `" alt="` + item.name.toUpperCase() + `" class="product-img">
                    <div class="product-box__info">
                    <h2 class="product-title">` + item.name.toUpperCase() + `</h2>
                    <div class="product-box__price">
                      <span class="price">R$ ` + item.price.toFixed(2).replace('.', ',') + `</span>
                      <p>até ` + item.parcelamento[0] + `x de R$` + item.parcelamento[1].toFixed(2).replace('.', ',') + `</p>
                    </div>
                    <button data-product-id="product-box-` + index + `" class="botao-comprar" data-add-product >COMPRAR</button>
                    </div>
                  </div>
              `;

        console.log('item COR', item.color);

        shopContent.innerHTML += htmlDoItem;
      });
    }

    const botoesComprar = document.querySelectorAll('.botao-comprar');
    const cartContentItem = document.querySelector('.cart-content');
    botoesComprar.forEach(botao => {
      botao.addEventListener('click', function (e) {
        const produto = document.getElementById(botao.dataset.productId);
        const itemHtml = document.createElement('div');
        itemHtml.innerHTML = `
          <div class="item-sacola">
            <img src="` + produto.querySelector('img').src + `" />
            <div class="item-sacola-info">
              <p class="titulo-produto">` + produto.querySelector('.product-title').innerText + `</p>
              <p class="preco-produto">` + produto.querySelector('span.price').innerText + `</p>
              <input type="number" value="1" />
            </div>
            <button id = "ExcluideProduto">x</button>
          </div>
        `;

        itemHtml.querySelector('button').addEventListener('click', function () {
          itemHtml.remove();
          Updatetotal();
        });
        itemHtml.querySelector('input').addEventListener('change', function () {
          Updatetotal();
        });
        cartContentItem.appendChild(itemHtml);
        Updatetotal();
      });
    });
  });
}

fetch('http://localhost:5000/products').then(res => res.json()).then(json => {
  const shopContent = document.querySelector('.shop-content');

  json.forEach((item, index) => {
    const htmlDoItem = `
            <div class="product-box" id="product-box-` + index + `">
                <img src="` + item.image + `" alt="` + item.name.toUpperCase() + `" class="product-img">
                <div class="product-box__info">
                <h2 class="product-title">` + item.name.toUpperCase() + `</h2>
                <div class="product-box__price">
                    <span class="price">R$ ` + item.price.toFixed(2).replace('.', ',') + `</span>
                    <p>até ` + item.parcelamento[0] + `x de R$` + item.parcelamento[1].toFixed(2).replace('.', ',') + `</p>
                </div>
                <button data-product-id="product-box-` + index + `" class="botao-comprar" data-add-product>COMPRAR</button>
                </div>
            </div>
        `;

    shopContent.innerHTML += htmlDoItem;
  });

  const botoesComprar = document.querySelectorAll('.botao-comprar');
  const cartContentItem = document.querySelector('.cart-content');
  botoesComprar.forEach((botao, index) => {
    botao.addEventListener('click', function (e) {
      const produto = document.getElementById(botao.dataset.productId);
      const itemHtml = document.createElement('div');
      itemHtml.innerHTML = `
        <div class="item-sacola" id="item-sacola-` + index + `">
          <img src="` + produto.querySelector('img').src + `" />
          <div class="item-sacola-info">
            <p class="titulo-produto">` + produto.querySelector('.product-title').innerText + `</p>
            <p class="preco-produto">` + produto.querySelector('span.price').innerText + `</p>
            <input  class = "quantidade" type="number" value="1" />
          </div>
          <button id = "ExcluideProduto">x</button>
        </div>
      `;

      itemHtml.querySelector('button').addEventListener('click', function () {
        itemHtml.remove();
        Updatetotal();
      });
      itemHtml.querySelector('input').addEventListener('change', function () {
        Updatetotal();
      });
      cartContentItem.appendChild(itemHtml);
      Updatetotal();
    });
  });
});


function Updatetotal() {
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartContentFilhos = cartContent.children;
  var total = 0;

  for (var i = 0; i < cartContentFilhos.length; i++) {
    var cartBox = cartContentFilhos[i];
    var priceElement = cartBox.querySelector('p.preco-produto');
    var quantityElement = cartBox.querySelector('input');
    var price = parseFloat(priceElement.innerText.replace("R$", "").replace(",", "."));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
  }

  document.getElementsByClassName('totalPrice')[0].innerText = ('R$ ' + total.toFixed(2)).replace(".", ",");
}


//cart
let cartIcon = document.querySelector("#sacola");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close_cart");
//Open Cart
cartIcon.onclick = () => {
  cart.style.display = 'block';
};
// Close Crt
closeCart.onclick = () => {
  cart.style.display = 'none';
};

const  filtrarMobile = document.querySelector('.filtrarMobile');
const fecharMenu = document.querySelector('#closeMobile');
const AbrirFiltro  = document.querySelector ('#AbrirFiltro')
AbrirFiltro.addEventListener('click', function() {
  filtrarMobile.style.visibility ='visible' ;
  filtrarMobile.style.width = '100%';

   
});
fecharMenu.addEventListener('click', function() {
  filtrarMobile.style.visibility = 'hidden' ;
  filtrarMobile.style.width = '0' ;


});

 const AbrirSeta  = document.querySelector ('#MobileCoresButton')
 const  filterCoolors = document.querySelector('.filter-colors');

 AbrirSeta.addEventListener('click', function() {
  if(filterCoolors.style.visibility ==='hidden'){
    filterCoolors.style.visibility ='visible' ;
    filterCoolors.style.height = 'unset';
  } else {
    filterCoolors.style.visibility ='hidden' ;
    filterCoolors.style.height = '0';
  }
 });


 const AbrirSetaa  = document.querySelector ('#MobileTamanhosButton')
 const  filterTamanhoo = document.querySelector('.filter-tamanho');

 AbrirSetaa.addEventListener('click', function() {
  if(filterTamanhoo.style.visibility ==='hidden'){
    filterTamanhoo.style.visibility ='visible' ;
    filterTamanhoo.style.height = 'unset';
  } else {
    filterTamanhoo.style.visibility ='hidden' ;
    filterTamanhoo.style.height = '0';
  }
 });

 const AbrirSetaaa  = document.querySelector ('#MobilePrecoButton')
 const filterPreco = document.querySelector('#filter-precoo');

 AbrirSetaaa.addEventListener('click', function() {
  if(filterPreco.style.visibility ==='hidden'){
    filterPreco.style.visibility ='visible' ;
    filterPreco.style.height = 'unset';
  } else {
    filterPreco.style.visibility ='hidden' ;
    filterPreco.style.height = '0';
  }
 });


const  filtrarMobileOrdenar = document.querySelector('.filtrarMobileOrdenar');
const fecharOrdenar = document.querySelector('#closeMobilee');
const AbrirFiltroOrdenar  = document.querySelector ('#AbrirOrdernar')
AbrirFiltroOrdenar.addEventListener('click', function() {
  filtrarMobileOrdenar.style.visibility ='visible' ;
  filtrarMobileOrdenar.style.width = '100%';

   
});
fecharOrdenar.addEventListener('click', function() {
  filtrarMobileOrdenar.style.visibility = 'hidden' ;
  filtrarMobileOrdenar.style.width = '0' ;

});





