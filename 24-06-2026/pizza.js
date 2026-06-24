// data storage
const MENU = {
  Size : {
    thin:8.00,
    regular:10.00,
    stuffed:12.00
  },

  Lenght : {
    small:1.0,
    medium:1.5,
    large:2.0
  },

  toppings : {
    cheese:1.0,
    pepperoni:1.0,
    mushrooms:1.0,
    onions:1.0,
    peppers:1.0,
    sausage:1.0
  }
};


// Pure Logic

const calculatePrice = (Size, Lenght) => {

  const Sizeprize = MENU.Size[Size] || MENU.Size.regular;

  const Lenghtprize = MENU.Lenght[Lenght] || MENU.Lenght.medium;

  return Sizeprize * Lenghtprize;
};


const calculateToppingsPrice = (toppings) => {

  return toppings.reduce((total, topping) => {

    return total + MENU.toppings[topping];

  }, 0);
};


// Higher Order Function

const calculateTotalPrice = (calculatePrice, calculateToppingsPrice) => {

  return (Size, Lenght, toppings) => {

    const basePrice = calculatePrice(Size, Lenght);

    const toppingsPrice = calculateToppingsPrice(toppings);

    return basePrice + toppingsPrice;
  };
};


const finalPrice = calculateTotalPrice(
  calculatePrice,
  calculateToppingsPrice
);


// Button Function

function placeOrder(){

  let Size = document.getElementById("crust").value;

  let Lenght = document.querySelector(
      "input[name='pizzaSize']:checked"
  ).value;


  let checkedItems = document.querySelectorAll(
      "input[name='topping']:checked"
  );


  let toppings = [];


  checkedItems.forEach((item)=>{

      toppings.push(item.value);

  });


  let base = calculatePrice(Size,Lenght);

  let top = calculateToppingsPrice(toppings);

  let subtotal = base + top;

  let discount = subtotal * 0.10;

  let total = subtotal - discount;


  document.getElementById("pizzaTitle").innerText =
      Lenght.toUpperCase() + " " +
      Size.toUpperCase() + " CRUST PIZZA";

  document.getElementById("basePrice").innerText =
      "$" + base.toFixed(2);

  document.getElementById("toppingPrice").innerText =
      "$" + top.toFixed(2);

  document.getElementById("subTotal").innerText =
      "$" + subtotal.toFixed(2);

  document.getElementById("totalPrice").innerText =
      "$" + total.toFixed(2);
}