import React, { Component } from 'react';
// import HeadFoot from "./HeadFoot";
// import ProductList from "./ProductList";
import "../styles/Main.css";
import "../styles/Cardproduct.css";
import axios from 'axios';
// import Clock from 'react-live-clock';
import { Link } from "react-router-dom";

const URL_PRODUCT_LIST = 'http://localhost:4000/api/product/getall'
const URL_POST_CATEGORY = 'http://localhost:4000/api/category/insert'
const URL_ADD_PRODUCT = 'http://localhost:4000/api/product/insert'
const URL_EDIT_PRODUCT = 'http://localhost:4000/api/product/update'
const URL_DELETE_PRODUCT = 'http://localhost:4000/api/product/del'
const URL_VIEW_CART = 'http://localhost:4000/api/cart/cartuser'
const URL_ADD_TO_CART = 'http://localhost:4000/api/cart/add'
const URL_REDUCE_TO_CART = 'http://localhost:4000/api/cart/reduce'






class Main extends Component {
  
  state = {

    keyword : '',

    product: [],
    date : new Date(),
    category : {
      name : ''
    },

    productAdd : {
      name : '',
      id_category : 0,
      description : '',
      stock       : 0,
      price       : 0,
      images      :'',
      created_at  : new Date(),
      updated_at  : new Date()
      
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
  
    delProduct : {
      id : 0,
      name : '',
      id_category : 0,
      description : '',
      stock       : 0,
      price       : 0,
      images      :'',
      updated_at  : new Date()
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

    cart :{
      invoice : 0,
      cashier : '',
      total_item : 0,
      total_price : 0,
      ppn : 0,
      total_price_order: 0,
      product : [{
        invoice : 0,
        cashier : '',
        id_product : 0,
        product : '',
        price : 0,
        category : '',
        qty : 0,
        total_price : ''
      }]
    }

    
    
  };


  //CART

  checkCart() {
    axios.get( `${URL_VIEW_CART}/${localStorage.getItem('id_cashier')}`)
    .then(res => {
      const cart = res.data;
      this.setState({ cart });
      // console.log(this.state.cart)
    })
   }  
  
  //ADD CATEGORY 
  postCategory = () => {
    axios.post(URL_POST_CATEGORY, this.state.category
    )
      .then((res) => {
        console.log(res.data)
        
      })
      .catch(err => console.log(err));
    };
  onChangeStateCategory = (e) => {
      let categoryNew = this.state.category
      categoryNew[e.target.name] = e.target.value;
      e.preventDefault();
      this.setState(
        {
          category : categoryNew
        }  
      );
      console.log(this.state.category.name)
      console.log(e.target.name)
    };

  handleSubmitCategory = (e) => {
    e.preventDefault();
    console.log(this.state.category.name)
    this.postCategory()
    };
    //END ADD CATEGORY
    


  //PRODUCT ADD 
  addProduct = () => {
    let fs = new FormData()
    fs.set('name',this.state.productAdd.name)
    fs.set('id_category',this.state.productAdd.id_category)
    fs.set('description',this.state.productAdd.description)
    fs.set('stock',this.state.productAdd.stock)
    fs.set('price',this.state.productAdd.price)   
    fs.append('images',this.state.productAdd.images)
    fs.set('created_at',new Date())
    fs.set('updated_at',new Date())
   
    axios.post(URL_ADD_PRODUCT, fs)
        .then(response => this.getProduct(),this.resetState())
        .catch(err => console.log(err));
  };

  onChangeStateAddProduct = (e) => {
    let productAddNew = this.state.productAdd;
    productAddNew[e.target.name] = e.target.value;     
    e.preventDefault();
    console.log(e.target.value);
    this.setState(
      {
        productAdd : productAddNew
      }  
    );
  };

  onChangeStateFileUpload = (e) => {
    let productAddNew = this.state.productAdd;
    productAddNew[e.target.name] = e.target.files[0];    
    e.preventDefault();
    console.log(e.target.files[0]);
    this.setState(
      {
        productAdd : productAddNew
      }  
    );
  };

  handleSubmitAddProduct = (e) =>{
    e.preventDefault();
    this.addProduct();
   };
  //END PRODUCT ADD

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
  //END EDIT PRODUCT 

  //DELETE PRODUCT
  handleDelete = (data) => {
    let del = {...data}
    this.setState({
      delProduct : del
    })
  };

  deleteProduct = () => {
    axios.delete(`${URL_DELETE_PRODUCT}/${this.state.delProduct.id}`)
    .then(response => this.getProduct())
    .catch(err => console.log(err));
  };

  handleSubmitDeleteProduct = (e) =>{
    console.log(this.state.delProduct.id)
    e.preventDefault();
    this.deleteProduct();
   };
   //END DELETE PRODUCT

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

    //SEARCH
    onChangeSearch = (e) => {
      const keyword = e.target.value
      this.setState({
        keyword : keyword
      })
    }

    resetState = () => {
      this.setState({productAdd :{
        name : '',
        id_category : 0,
        description : '',
        stock       : 0,
        price       : 0,
        images      :'',
        created_at  : new Date(),
        updated_at  : new Date()
      } });
   }

   handleAddToCart= (data) => {
     console.log('tes')

      let item = {
        id_product : data,
        qty : 1
      }      
      axios.post(`${URL_ADD_TO_CART}/${localStorage.getItem('id_cashier')}`, item )
      .then(()=> this.checkCart())
      .catch(err => console.log(err));
    };

    handleReduceToCart= (data) => {
      console.log('tes')
 
       let item = {
         id_product : data,
         qty : 1
       }      
       axios.post(`${URL_REDUCE_TO_CART}/${localStorage.getItem('id_cashier')}`, item )
       .then(()=> this.checkCart())
       .catch(err => console.log(err));
     };
 
  componentDidMount() {
    this.checkCart();
    this.getProduct();
  };
  

  render() {

    let filterProduct = this.state.product.filter((product)=>{
      return product.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
    })

    return (
      

        <div className="mainmain" >
{/*         
        <div className="addbutton">
        <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#ModalAdd"  >Add Product</button>
        <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#AddCategory"  >Add Category</button>
        </div> */}

        {/* search */}
        <div id="searchingmain">
        <input name="name"  type="searchmain" placeholder="Search" onChange={this.onChangeSearch} />
        </div>
        {/* title menu */}
        <div className="header-title-page-main">
          Food Items
        </div>
        

        {/* CART */}
        <div class="cart-header">
           <Link to="" className="cart-text-header">Cart {this.state.cart.total_item}</Link>
        </div>
        <div class="cart-side">
        {/* list cart */}
        {this.state.cart.product.map(cart =>{
          return(
          <div class="item">
            <div class="buttons">
              <span class="delete-btn"></span>
            </div>
            <div class="image">
            <img src={cart.images} width="88" height="80" alt="" />

            </div>

            <div class="description">
              <span>{cart.product}</span>
              <span></span>
              <span>  @{cart.price}</span>
            </div>

            <div class="quantity">
              <button class="btn-cart" type="button" name="button" onClick={() => this.handleAddToCart(cart.id_product)}>
                
                <img src="https://designmodo.com/demo/shopping-cart/plus.svg" alt=""  />
              </button>
              <input type="text" name="name" value={cart.qty}/>
              <button class="btn-cart" type="button" name="button" onClick={() => this.handleReduceToCart(cart.id_product)}>
                <img src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
              </button>
            </div>
            <div class="total-price">{cart.total_price}</div>
          </div>
          
          )
          })}
          <br/>
          <div class="total-order-title">Total PPN 10% IDR</div>
          <div class="total-order">{this.state.cart.ppn}</div>
          <br/>
          <br/>
          <div class="total-order-title">Total IDR </div>
          <div class="total-order">{this.state.cart.total_price_order}</div>
          

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
                <img class="card-img-top" src={this.state.detailProduct.images} alt="Card img cap" height= "200" width= "250" ></img>
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
                {/* <div class="card-body">
                  <a href="http://localhost:4000/uploads/2020-02-05T08:20:59.334Zamericano.jpeg" class="card-link">Card link</a>
                  <a href="http://localhost:4000/uploads/2020-02-05T08:20:59.334Zamericano.jpeg" class="card-link">Another link</a>
                </div> */}
              </div>
            </div>
            </div>
        </div>
        {/* END MODAL */}

        {/* MODAL CATEGORY */}
        <div className="modal fade" id="AddCategory" tabIndex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">                
                  <h4 className="modal-title" id="myModalLabel">Add Product</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">^</button>
              </div>
            <form  >
                <div className="modal-body">
                    <div className="form-group">
                        <label className="control-label col-xs-3" >Category</label>
                        <div className="col-xs-9">
                            <input name="name" id="nama_barang" className="form-control" type="text" placeholder="Name of product" value={this.state.category.name}  onChange={this.onChangeStateCategory} required/>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-outline-info" data-dismiss="modal" aria-hidden="true">Tutup</button>
                    <button className="btn btn-info" id="button-submit" data-dismiss="modal" onClick={this.handleSubmitCategory} >Simpan</button>
                </div>
            </form>
            </div>
            </div>
        </div>
        {/* END MODAL CATEGORY */}
            

        {/* MODAL ADD */}
        <div className="modal fade" id="ModalAdd" tabIndex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">                
                <h4 className="modal-title" id="myModalLabel">Add Product</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">^</button>
            </div>
            <form className="form-horizontal">
            <div className="modal-body">
                    <div className="form-group">
                        <label className="control-label col-xs-3" >Product</label>
                        <div className="col-xs-9">
                            <input name="name" id="nama_barang" className="form-control" type="text" placeholder="Name of product" value={this.state.productAdd.name}  onChange={this.onChangeStateAddProduct}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-xs-3" >Category</label>
                        <div className="col-xs-9">
                            <select name="id_category" id="id_cashier" onChange={this.onChangeStateAddProduct}>
                            <option value="none" selected disabled hidden> Select an Category</option> 
                            <option value="1" >Foods</option>
                            <option value="2" >Drinks</option>
                            <option value="3">Snack</option>
                            </select> 
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-xs-3" >Description</label>
                        <div className="col-xs-9">
                            <input name="description" id="nama_barang" className="form-control" type="text" placeholder="Description of product" value={this.state.productAdd.description}  onChange={this.onChangeStateAddProduct}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-xs-3" >Stock</label>
                        <div className="col-xs-9">
                            <input name="stock" id="price" className="form-control" type="text"  placeholder="Number of stock" value={this.state.productAdd.stock}  onChange={this.onChangeStateAddProduct} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-xs-3" >Price</label>
                        <div className="col-xs-9">
                            <input name="price" id="price" className="form-control" type="text" placeholder="Kategori" value={this.state.productAdd.price}  onChange={this.onChangeStateAddProduct} required/>
                        </div>
                    </div>
                    <div  className="form-group">
                        Select image to upload:
                        <input type="file" name="images" id="fileToUpload" onChange={this.onChangeStateFileUpload.bind(this)}/>
                    </div> 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-outline-info" data-dismiss="modal" aria-hidden="true">Tutup</button>
                    <button className="btn btn-info" id="btn_simpan" data-dismiss="modal" onClick={this.handleSubmitAddProduct.bind(this)}>Save</button>
                </div>
            </form>
            </div>
            </div>
        </div> 
        {/* END MODAL ADD */}


        {/*   //MODAL EDIT */}
        <div className="modal fade" id="ModalEdit" tabIndex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">                
                <h4 className="modal-title" id="myModalLabel">Edit Product</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">^</button>
            </div>
            <form className="form-horizontal">
            <div className="modal-body">
                    <div className="form-group">
                        <label className="control-label col-xs-3" >ID Product</label>
                        <div className="col-xs-9">
                            <input name="id" id="nama_barang" className="form-control" type="text" placeholder="Name of product" value={this.state.productEdit.id}  onChange={this.onChangeStateEditProduct}  readOnly/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-xs-3" >Product</label>
                        <div className="col-xs-9">
                            <input name="name" id="nama_barang" className="form-control" type="text" placeholder="Name of product" value={this.state.productEdit.name}  onChange={this.onChangeStateEditProduct}  required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-xs-3" >Category</label>
                        <div className="col-xs-9">
                            <select name="id_category" id="id_cashier" value={this.state.productEdit.id_category} onChange={this.onChangeStateEditProduct}>
                            <option value="1" >Foods</option>
                            <option value="2" >Drinks</option>
                            <option value="3">Snack</option>
                            </select> 
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-xs-3" >Description</label>
                        <div className="col-xs-9">
                            <input name="description" id="nama_barang" className="form-control" type="text" placeholder="Description of product" value={this.state.productEdit.description}  onChange={this.onChangeStateEditProduct} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-xs-3" >Stock</label>
                        <div className="col-xs-9">
                            <input name="stock" id="price" className="form-control" type="text"  placeholder="Number of stock" value={this.state.productEdit.stock}  onChange={this.onChangeStateEditProduct} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-xs-3" >Price</label>
                        <div className="col-xs-9">
                            <input name="price" id="price" className="form-control" type="text" placeholder="Kategori" value={this.state.productEdit.price}  onChange={this.onChangeStateEditProduct} required/>
                        </div>
                    </div>
                    <div  className="form-group">
                        Select image to upload:
                        <input type="file" name="images" id="fileToUpload" onChange={this.onChangeStateFileUploadEdit.bind(this)}/>
                    </div> 
                </div>
                <div className="modal-footer">
                    <button className="btn" data-dismiss="modal" aria-hidden="true">Close</button>
                    <button className="btn btn-info" id="btn_simpan" data-dismiss="modal" onClick={this.handleSubmitEditProduct.bind(this)}>Save</button>
                </div>
            </form>
            </div>
            </div>
        </div> 
        {/* END MODAL EDIT */}

        {/* MODAL DELETE */}

        <div className="modal fade" id="ModalDelete" tabIndex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">                
                  <h4 className="modal-title" id="myModalLabel">Delete this product?</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">^</button>
              </div>
            <form  >
   
             
                <div className="modal-footer">
                    <button className="btn btn-outline-info" data-dismiss="modal" aria-hidden="true">No</button>
                    <button className="btn btn-outline-danger" id="button-submit" data-dismiss="modal" onClick={this.handleSubmitDeleteProduct.bind(this)} >Delete</button>
                </div>
            </form>
            </div>
            </div>
        </div>

        {/* END MODAL DELETE */}

        {/* card product */}

          <div className="row">
                    
              {filterProduct.map(product =>{
                return(
                  
                  <div className="col-4">

                  <div className="containercard" >

                  <img src={product.images} alt=""></img>     
                  <div className="overlay" onClick={() => this.handleAddToCart(product.id)}>
 
                  
                                  
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

                  <p data-toggle="modal" data-target="#ModalDetail" onClick={()=>this.handleDetail(product)}>{product.name}<br/> IDR. {product.price}</p> 
                                 
                  </div>

                  </div>
                  )
                })}
              
            </div>

        {/*  */}
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
                        return<ProductList key={product.id} data={product} update={this.handleUpdate} delete={this.handleDelete} detail={this.handleDetail}/>
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