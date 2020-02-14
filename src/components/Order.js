import React, { Component } from 'react';
import ProductOrder from "./ProductOrder";
import "../styles/Order.css";
import axios from 'axios';
import Clock from 'react-live-clock';

const URL_PRODUCT_LIST = 'http://localhost:4000/api/product/getall'
const URL_VIEW_CART = 'http://localhost:4000/api/cart/cartuser/1'
const URL_BUY_PRODUCT = 'http://localhost:4000/api/cart/add/1'





class Main extends Component {
  
  state = {
    product : [],
    keyword : '',
    searching : "",


    date : new Date(),
    category : {
      name : ''
    },

   
    detailProduct : {
      id : 0,
      name : '',
      id_category : 0,
      description : '',
      stock       : 0,
      price       : 0,
      images      :'',
      updated_at  : new Date(),
      category    :''
    },


    
    //CART

  cart :{
    invoice : 0,
    cashier : '',
    total_item : 0,
    total_price : 0,
    product : [{
      invoice : 0,
      cashier : '',
      product : '',
      price : 0,
      category : '',
      qty : 0,
      total_price : ''
    }]
  },

  buyProduct : {
    id : 0,
    name : '',
    id_category : 0,
    description : '',
    stock       : 0,
    price       : 0,
    images      :'',
    updated_at  : new Date(),
    category    :''
  },

  


  };


  

  //DETAIL PRODUCT

  handleDetail = (data) => {
    this.setState({
      detailProduct : data
    })
  }


   //GET UPRODUCT
   getProduct() {
    axios.get(URL_PRODUCT_LIST)
    .then(res => {
      const product = res.data;
      this.setState({ product });
    })
   }


   //CART

   checkCart() {
    axios.get(URL_VIEW_CART)
    .then(res => {
      const cart = res.data;
      this.setState({ cart });
      // console.log(this.state.cart)
    })
   }

    //BUY
    handleBuy = (data) => {
      let buyProduct = data
      this.setState({ buyProduct : buyProduct
      })
      this.handleBuySubmit()
    };

    buyProduct = () => {
      let data = {
        id_product : this.state.buyProduct.id,
        qty : 1
      }
      console.log(data)
      
      axios.post(`${URL_BUY_PRODUCT}`, data )
      .then(response => console.log(response))
      .catch(err => console.log(err));
    };

    handleBuySubmit(e){
      console.log(this.state.buyProduct)
      e.preventDefault();
      this.buyProduct();
    };
    //END BUY



    //SEARCH
    onChangeSearch = (e) => {
      const keyword = e.target.value
      this.setState({
        keyword : keyword
      })
    }


    componentDidMount() {
      this.getProduct();
      this.checkCart();
    };
    

  render() {
      let filterProduct = this.state.product.filter((product)=>{
        return product.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
      })
    return (
       

        <div className="main">      
        <div className="clock">
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} />
        </div>
        <div id="searching">
        <input name="name"  type="search" placeholder="Search product here.." onChange={this.onChangeSearch} />
        </div>

        {/* CART */}      
        <div class="shopping-cart">
          <div class="shopping-cart-head">
            <span class="product-quantity">{this.state.cart.total_item}</span> Product(s) in Cart
          </div>
          <table className="table table-striped table-hover">
            <thead>
                    <tr>
                    <th>Qty</th>
                    <th>Product Name</th>
                    <th>Total Price</th>
                    </tr>
            </thead>
            <tbody>
          {/* <ul class="shopping-cart-list"> */}
          {this.state.cart.product.map(product =>{
           return <tr>
            <td>{product.qty}</td>
            <td>{product.product}</td>    
            <td>{product.total_price}</td>
           </tr>
          })}
          {/* </ul> */}
          </tbody>
          </table>
          

          <div class="cart-buttons">
            <a href="#0" class="button empty-cart-btn">Empty</a>
            <a href="#0" class="button cart-checkout">Checkout - <span class="total-price">{this.state.cart.total_price}</span></a>
          </div>
        </div>      

        {/* END CART */}      
    
        {/* MODAL DETAIL */}
                <div className="modal fade" id="ModalDetail" tabIndex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">                
                  <h4 className="modal-title" id="myModalLabel">{this.state.detailProduct.name}</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">^</button>
              </div>
              <div class="card" >
                <img class="card-img-top" src={this.state.detailProduct.images} alt="Card img cap" height= "350" width= "480"  ></img>
                <div class="card-body">
                  <h4 class="card-title">Description</h4>
                  <h5 class="card-title">{this.state.detailProduct.description}</h5>
                </div>
                <table className="table table-striped table-hover">
                <tbody>
                  
                <tr>
                  <td>Category</td>
                  <td>{this.state.detailProduct.category}</td>
                </tr>
                <tr>
                  <td>Item Remaining</td>
                  <td>{this.state.detailProduct.stock}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{this.state.detailProduct.price}</td>
                </tr>
                </tbody>
                </table>
              </div>
            </div>
            </div>
        </div>
        {/* END MODAL */}


        <div className="container">
          <div className="row">
            <div className="col">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Picture</th> 
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                  
                    {filterProduct.map(product =>{
                        return<ProductOrder key={product.id} data={product} buy={this.handleBuy} submit={this.handleBuySubmit} detail={this.handleDetail}/>
                        })}  
                         
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>
    )

  }
  
}

export default Main;