const btncart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnclose = document.querySelector('#cart-close');

btncart.addEventListener('click',()=>{
    cart.classList.add('cart-active');
});

btnclose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',LoadFood);

function LoadFood(){
    loadContent();
}

function loadContent(){
    // Remove Items in Cart
    let btnremove=document.querySelectorAll('.cart-remove');
    btnremove.forEach((btn)=>{
        btn.addEventListener('click',removeItem)
    });

    //Product Item Change Event
    let qnty=document.querySelectorAll('.cart-quantity');
    qnty.forEach((val)=>{
        val.addEventListener('change',ChangeQty);
    })

    let cartbtn=document.querySelectorAll('.add-cart');
    cartbtn.forEach((btn)=>{
        btn.addEventListener('click',addcart);
    });

    updateTotal();
};

function removeItem(){
    if(confirm('Are You Sure To Remove')){
    let title=this.parentElement.querySelector('cart-food-title');
    itemList=itemList.filter((el)=>el.title==title);
    this.parentElement.remove();
    loadContent();
    }
};

function ChangeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    updateTotal();
};

let itemList=[];

function addcart(){
    let food=this.parentElement;
    let title=food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgscr= food.querySelector('.food-img').src;

    let newProduct={title,price,imgscr};
    //Check Product is already exists or not
    if(itemList.find((el)=>el.title==newProduct.title)){
        alert('Product Already Added To The Cart');
        return;
    }else{
        itemList.push(newProduct);
    }

    let cartbasket=document.querySelector('.cart-content');
    let newProductElement=createCartProduct(title,price,imgscr);

    let element=document.createElement('div');
    element.innerHTML=newProductElement;

    cartbasket.append(element);
    loadContent();
}

function createCartProduct(title,price,imgscr){
    return `
        <div class="cart-box">
            <img src="${imgscr}" class="cart-img">
                <div class="detail-box">
                    <div class="cart-food-title">${title}</div>
                    <div class="price-box">                         
                        <div class="cart-price">${price}</div>
                        <div class="cart-amt">${price}</div>
                    </div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                    <ion-icon name="trash" class="cart-remove"></ion-icon>
        </div> `;
}


//Total Upadates
function updateTotal(){
    const cartItem=document.querySelectorAll('.cart-box');
    const totalValue=document.querySelector('.total-price');

    let total=0;

    cartItem.forEach(product=>{
        let priceElement = product.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerText.replace("Rs.",""));

        let qtyInput=product.querySelector('.cart-quantity');
        let qty=parseInt(qtyInput.value);

        let itemTotal=price*qty;
        total+= itemTotal;

        let amtElement= product.querySelector('.cart-amt');
        if(amtElement){
        amtElement.innerText="RS."+itemTotal;
        }
    });
    totalValue.innerHTML='Rs.'+total;


    //Add Product Count in Cart Icon

    const cartCount=document.querySelector('.cart-count');
    let count=itemList.length;
    cartCount.innerHTML=count;

    if(count==0){
        cartCount.style.display='none';
    }else{
        cartCount.style.display='block';
    }
};





