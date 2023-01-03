var books=[];
    var category=["Sports","Romance","Horror","Health & Fitness"];
    document.getElementById("categories").innerHTML+=`
    <ul class="navbar-nav category-navbar">
              <div class="category-item">
                <li class="nav-item "> 
                  <a class="nav-link" href="#" onclick="categorical_books('Sports')" >${category[0]}</a></li>
              </div>
              <div class="category-item">
                <li class="nav-item "> 
                  <a class="nav-link" href="#" onclick="categorical_books('Romance')" >${category[1]}</a></li>
              </div>
              <div class="category-item">
                <li class="nav-item "> 
                  <a class="nav-link" href="#" onclick="categorical_books('Horror')" >${category[2]}</a></li>
              </div>
              <div class="category-item">
                <li class="nav-item "> 
                  <a class="nav-link" href="#" onclick="categorical_books('Health & Fitness')" >${category[3]}</a></li>
              </div>
      </ul>
    `;
    var w=window.innerWidth;
    if(w<992){
      console.log(w);
      document.getElementById("table-container").className="table-container-sm";
    }
           
    
      function add_book(){
        // let name=document.getElementById("bname").value;
        if(document.querySelector('input[name="selected_category"]:checked')==null){
          alert("select category");
        }
          const book={
          name:document.getElementById("bname").value,
          price:document.getElementById("bprice").value,
          desc:document.getElementById("bdesc").value,
          category:document.querySelector('input[name="selected_category"]:checked').value,
          quantity:1,
          total_price:null,        
          }
      
        if(book.name!=="" && book.desc!=="" && book.category!==""){
          if(book.price!="" && book.price!=0 && book.price>0){
            books.push(book);
            var i=(books.length-1);
            books[i].id=i;
            // console.log("Selected Category: ",books[i].category);
            show_book(i);
          }
          
          else{
            alert("Please Correct Price");
          }
        }
        else{
          alert("Fill all the sections");
        }
      }
      
      function categorical_books(genre){
        // console.log("Selected Genre: ",genre);
        searchedItemEl.innerHTML="";
        document.getElementById("comment").innerHTML=`<b >${genre} books are:</b>`;
        var check=true;
        books.forEach((item)=>{
          if(item.category==genre){
            searchedItemEl.innerHTML+=`
            <div class="column">
              <div class="card">
                <h5 class="card-title">${item.name}</h5>
                <b><i style="font-size: large;">${item.price}$</i></b>
                <p class="card-text">${item.desc}</p>        
                <p class="card-text">${item.category}</p>       
                <button type="button" onclick="add_to_cart(${item.id})" class="btn btn-primary">Add to Cart </button>
              </div>
            </div>
            `;
            check=false;
          }
        });
        if(check==true){
            document.getElementById("comment").innerHTML=`<b class="text-danger"> ${genre} books are Not found!</b>`;
        }
      }
      function show_book(i){
        document.getElementById("show-books").innerHTML+=`
            <div class="card" >
              <div class="card-body">
                <h5 class="card-title">${books[i].name}</h5>
                <b><i style="font-size: large;">${books[i].price}$</i></b>
                <p class="card-text">${books[i].desc}</p>    
                <p class="card-text">Category: ${books[i].category}</p>            
                <button type="button" onclick="add_to_cart(${books[i].id})" class="btn btn-primary">Add to Cart </button>
              </div>
            </div>`;
            // console.log("Books array: ",books);
          }
      function search(){
        var book_title=document.getElementById("search_book").value.toLowerCase();
        var check=false;
        document.getElementById("comment").innerHTML=`<b >Searched Results: </b>`;
        searchedItemEl.innerHTML="";
        books.forEach((item)=>{
            let demo_name= item.name.toLowerCase();
            console.log(demo_name);
            let result=demo_name.match(book_title);
            console.log(result);
            
          if(result!=null){
            check=true;
            searchedItemEl.innerHTML+=`
            <div class="column">
              <div class="card">
                <h5 class="card-title">${item.name}</h5>
                <b><i style="font-size: large;">${item.price}</i></b>
                <p class="card-text">${item.desc}</p>        
                <p class="card-text">${item.category}</p>       
                <button type="button" onclick="add_to_cart(${item.id})" class="btn btn-primary">Add to Cart </button>
              </div>
            </div>
            `;
          }
        });
        if(check!=true){
            document.getElementById("comment").innerHTML=`<b class="text-danger">No Book found! </b>`;
        }
      }
      
      // const booksListEl = document.querySelector(".books-list");
      var cart =[];
    function add_to_cart(index){
        if(cart.length<1){
            cart.push(books[index]);
            console.log(cart);
           
            var ind=(cart.length-1);
            cart[ind].total_price=books[index].price;
            update_cart();
        }    
        else{
            debugger;
            var flag=true;

            cart.forEach((item)=>{
                if(item.id==books[index].id ){
                    item.quantity++;
                    if(item.quantity>10){
                        item.quantity=10;
                    }
                    item.total_price=item.price*item.quantity;
                    console.log(item);
                    flag=false;
                    update_cart();
                }
            })
            if(flag==true){
                cart.push(books[index]);
                var ind=(cart.length-1);
                cart[ind].quantity=1;
            }
            cart.forEach((item)=>{
                item.total_price=item.price*item.quantity;
            })
            
            update_cart();
        }
        rendertotal();
        show_table();
     }
    
     function update_cart(){
      cartItemsEl.innerHTML = "";
      cart.forEach((item)=>{
        cartItemsEl.innerHTML+=`
        <tr>
          <td>${item.name}</td>
            <td class="d-flex">
              <button type="button" onclick="update_quantity('minus',${item.price},${item.id})">-</button>
                ${item.quantity}
              <button type="button" onclick="update_quantity('plus',${item.price},${item.id})">+</button>
            </td>
            <td>${item.total_price}</td>
          <td><button type="button" onclick="remove_cart_item(${item.id})" class="bg-danger" >Remove</button></td>
        </tr>
      `;
      });
      rendertotal();
     }

     function update_quantity(operator,price,index){
      let total=0;
      
      console.log("index of to be updated item: ",index);
      cart.forEach((item)=>{
        if(item.id==index){
            if(operator=='minus'){
                if(item.quantity>=1)
                {
                    item.quantity--;
                    if(item.quantity==0){
                        remove_cart_item(item.id);
                    }
                    total+=item.price*item.quantity;
                    item.total_price=total;
                    console.log("price",price);
                    console.log("minus total",total);
                }
            
            // 20 will be replaced with the item_price 
            // when the products will rendered
          }
          if(operator=='plus'&& item.quantity>=0){
            if(item.quantity<10){         
              item.quantity++;
              total+=item.price*item.quantity;
              item.total_price=total;
              console.log("price",price);
              console.log("plus total",total);
            }
          }
        }
        console.log(item);

      });
    
    
    update_cart();
    rendertotal();
    }
    function rendertotal(){
        let total_quantity=0;
        let total_price=0;
        cart.forEach((item)=>{
            total_quantity+=item.quantity;
            total_price+=item.total_price;
        });
        console.log("Total quantity: ",total_quantity);
        console.log("Total price: ",total_price);
        document.getElementById("total_price").innerHTML=`${total_price}$`;
        document.getElementById("total_quantity").innerHTML=`Total Quantity: ${total_quantity}`;
    }
    function remove_cart_item(index) {
      cart.forEach((item)=>{
        if(item.id==index){
          // console.log("item: ",item);
          const demo=cart.splice(cart.indexOf(item),1);
          item.quantity=1;
          // console.log("demo: ",demo);
        }
      });
      // console.log(cart);
      update_cart();
    }
    //  function show_cart(i){
    //   // debugger;
    //   cartItemsEl.innerHTML = "";
    //   document.getElementById("cart-items").innerHTML+=`
    //     <tr>
    //       <td>${cart[i].name}</td>
    //         <td class="d-flex">
    //           <button type="button" onclick="update_quantity('minus',${cart[i].price},${i})">-</button>
    //             ${cart[i].quantity}
    //           <button type="button" onclick="update_quantity('plus',${cart[i].price},${i})">+</button>
    //         </td>
    //         <td>${cart[i].price}</td>
    //       <td><button type="button" onclick="remove_cart_item(${i})" class="bg-danger" >Remove</button></td>
    //     </tr>
    //   `;
    //  }