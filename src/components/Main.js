import React, { Component } from 'react';
import HeadFoot from "./HeadFoot";
import ProductList from "./ProductList";
import "../styles/Main.css";
import axios from 'axios';
import Clock from 'react-live-clock';

const URL_PRODUCT_LIST = 'http://localhost:4000/api/product/getall'
const URL_POST_CATEGORY = 'http://localhost:4000/api/category/insert'
const URL_ADD_PRODUCT = 'http://localhost:4000/api/product/insert'
const URL_EDIT_PRODUCT = 'http://localhost:4000/api/product/update'
const URL_DELETE_PRODUCT = 'http://localhost:4000/api/product/del'




class Main extends Component {
  
  state = {
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
    }
  };


  
  
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

  handleSubmitCategory(e) {
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
        .then(response => this.getProduct())
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



  componentDidMount() {
    this.getProduct();
  };
  

  render() {
    return (

        <div className="main">
        <HeadFoot title="Kedai Kopi Kini"/>
        <div className="clock">
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} />
        </div>
        <HeadFoot title="Way Halim"/>
        <div className="addbutton">
        <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#ModalAdd"  >Add Product</button>
        <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#AddCategory"  >Add Category</button>
        </div>

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
                  <p class="card-text">{this.state.detailProduct.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Category          : {this.state.detailProduct.category}</li>
                  <li class="list-group-item">Item Remaining    : {this.state.detailProduct.stock}</li>
                  <li class="list-group-item">Price             : {this.state.detailProduct.price}</li>
                </ul>
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
                    <button className="btn btn-info" id="button-submit" data-dismiss="modal" onClick={this.handleSubmitCategory.bind(this)} >Simpan</button>
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
                            <input name="name" id="nama_barang" className="form-control" type="text" placeholder="Name of product" value={this.state.productAdd.name}  onChange={this.onChangeStateAddProduct}  required/>
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
                            <input name="description" id="nama_barang" className="form-control" type="text" placeholder="Description of product" value={this.state.productAdd.description}  onChange={this.onChangeStateAddProduct} required/>
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



        <div className="container">  
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Picture</th> 
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                  
                    {this.state.product.map(product =>{
                        return<ProductList key={product.id} data={product} update={this.handleUpdate} delete={this.handleDelete} detail={this.handleDetail}/>
                        })}  
                         
                </tbody>
            </table>
        </div>
        </div>


    )

  }
  
}

export default Main;