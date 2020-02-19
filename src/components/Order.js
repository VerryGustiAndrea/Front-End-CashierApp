import React, { Component } from 'react';
// import ProductOrder from "./ProductOrder";
import "../styles/Order.css";
import axios from 'axios';
// import Clock from 'react-live-clock';
import "../styles/Cardproduct.css";

const URL_PRODUCT_LIST = 'http://localhost:4000/api/product/getall'
const URL_VIEW_CART = 'http://localhost:4000/api/cart/cartuser/1'
const URL_EDIT_PRODUCT = 'http://localhost:4000/api/product/update'
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

  productEdit : {
    id : 0,
    name : '',
    id_category : 0,
    description : '',
    stock       : 0,
    price       : 0,
    images      :'',
    updated_at  : new Date()
    
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


    //UPDATE DELETE

 
   //EDIT PRODUCT
   handleUpdate = (data) => {
    let update = {...data}
    console.log(update)
    this.setState({
      productEdit : update
    })
  }

  editProduct = () => {
    let u = new FormData()
    u.set('name',this.state.productEdit.name)
    u.set('id_category',this.state.productEdit.id_category)
    u.set('description',this.state.productEdit.description)
    u.set('stock',this.state.productEdit.stock)
    u.set('price',this.state.productEdit.price)   
    u.append('images',this.state.productEdit.images)
   
    axios.patch(`${URL_EDIT_PRODUCT}/${this.state.productEdit.id}`, u)
        .then(response => this.getProduct())
        .catch(err => console.log(err));
  };

  onChangeStateEditProduct = (e) => {
    let productEditNew = this.state.productEdit;
    productEditNew[e.target.name] = e.target.value;     
    e.preventDefault();
    console.log(e.target.value);
    this.setState(
      {
        productEdit : productEditNew
      }  
    );
  };

  onChangeStateFileUploadEdit = (e) => {
    let productEditNew = this.state.productEdit;
    productEditNew[e.target.name] = e.target.files[0];    
    e.preventDefault();
    console.log(e.target.files[0]);
    this.setState(
      {
        productEdit : productEditNew
      }  
    );
  };

  handleSubmitEditProduct = (e) =>{
    console.log(this.state.productEdit)
    e.preventDefault();
    this.editProduct();
   };



    componentDidMount() {
      this.getProduct();
      this.checkCart();
    };
    

  render() {
      let filterProduct = this.state.product.filter((product)=>{
        return product.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
      })
    return (
       

        <div className="mainorder">      
        {/* search */}
        <div id="searchingorder">
        <input name="name"  type="searchmain" placeholder="Search" onChange={this.onChangeSearch} />
        </div>

        <div className="header-title-page-order">
          Order
        </div>

        {/* CART */}      
        {/* <div className="shopping-cart"> */}
          {/* <div className="shopping-cart-head"> */}
            {/* <span className="product-quantity">{this.state.cart.total_item}</span> Product(s) in Cart */}
          {/* </div> */}
          {/* <table className="table table-striped table-hover"> */}
            {/* <thead> */}
                    {/* <tr> */}
                    {/* <th>Qty</th> */}
                    {/* <th>Product Name</th> */}
                    {/* <th>Total Price</th> */}
                    {/* </tr> */}
            {/* </thead> */}
            {/* <tbody> */}
          {/* <ul class="shopping-cart-list"> */}
          {/* {this.state.cart.product.map(product =>{ */}
           {/* return <tr key="cart"> */}
            {/* <td>{product.qty}</td> */}
            {/* <td>{product.product}</td>     */}
            {/* <td>{product.total_price}</td> */}
           {/* </tr> */}
          {/* })} */}
          {/* </ul> */}
          {/* </tbody> */}
          {/* </table> */}
          

          {/* <div className="cart-buttons"> */}
            {/* <a href="#0" className="button empty-cart-btn">Empty</a> */}
            {/* <a href="#0" className="button cart-checkout">Checkout - <span className="total-price">{this.state.cart.total_price}</span></a> */}
          {/* </div> */}
        {/* </div>       */}

        {/* END CART */}      

        {/* <!-- CART DIV --> */}
        <div class="cart-header">
           <a className="cart-text-header" href="http://localhost:3000/order">Cart</a>
        </div>
        <div class="cart-side">
          <a class="active" href="http://localhost:3000/main"><i class="fa fa-home"></i></a>
          <a href="http://localhost:3000/order"><i class="fa fa-search"></i></a>
          <a href="http://localhost:3000/history"><i class="fa fa-envelope"></i></a>
        </div>




    
        {/* MODAL DETAIL */}
                <div className="modal fade" id="ModalDetail" tabIndex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">                
                  <h4 className="modal-title" id="myModalLabel">{this.state.detailProduct.name}</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">^</button>
              </div>
              <div className="card" >
                <img className="card-img-top" src={this.state.detailProduct.images} alt="Card img cap" height= "350" width= "480"  ></img>
                <div className="card-body">
                  <h4 className="card-title">Description</h4>
                  <h5 className="card-title">{this.state.detailProduct.description}</h5>
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


        {/* card product */}

        <div className="row">
                    
                    {filterProduct.map(product =>{
                      return(
                        
                        <div className="col-4">
      
                        <div className="containercard" onClick={()=>this.handleDetail(product)} data-toggle="modal" data-target="#ModalDetail">
                          <p>{product.name}</p>
                        <img src={product.images} alt="" height= "320"></img>     
                        <div className="overlay">
       
                        
                                        
                          <div className = "items"></div>
                          <div className = "items head">
                            <p>{product.name}</p>
                            <hr/>
                          </div>
                          <div className = "items price">
                            <p className="old">{product.stock}</p>
                            <p className="new">IDR {product.price}</p>
                          </div>
                          <div className="items cart">
                            <i className="fa fa-shopping-cart"></i>
                            <span>ADD TO CART</span>
                        </div>
                        </div>
                        <td><button type="button" className="btn btn-outline-info" data-toggle="modal" onClick={() => this.handleUpdate(product)} data-target="#ModalEdit"  >edit</button>
                      <button type="button" className="btn btn-outline-secondary"  data-toggle="modal" onClick={() => this.handleDelete(product)} data-target="#ModalDelete">hapus</button>
                        </td>  
                        </div>
                        </div>
                        )
                      })}
                    
                  </div>


        {/* <div className="container">
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
          </div> */}
        </div>
    )

  }
  
}

export default Main;