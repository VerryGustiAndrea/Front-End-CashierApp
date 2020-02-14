import React, { Component } from 'react';
import ProductOrder from "./HistoryData";
import "../styles/History.css";
import axios from 'axios';
import Clock from 'react-live-clock';

const URL_HISTORY_LIST = 'http://localhost:4000/api/cart/history'
const URL_VIEW_CART = 'http://localhost:4000/api/cart/cartuser/1'
const URL_BUY_PRODUCT = 'http://localhost:4000/api/cart/add/1'
const URL_DETAIL_ORDER = 'http://localhost:4000/api/cart/orderdetail'






class History extends Component {
  
  state = {

    code :0,
    orderdetail : {
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

    history : [],
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


   //GET HISTORY
   getHistory() {
    axios.get(URL_HISTORY_LIST)
    .then(res => {
      const history = res.data;
      this.setState({ history });
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



    
    //HANDLE DETAIL ORDER
  handleDetailOrder = (data) => {
      let code = data
    this.setState({
      code : code
    })
    this.getDetailOrder();
  }


   //GET DETAIL ORDER
   getDetailOrder() {
       console.log(this.state.code)
    axios.get(`${URL_DETAIL_ORDER}/${this.state.code}`)
    .then(res => {
      const orderdetail = res.data;
      this.setState({ orderdetail });
    })
   }




    componentDidMount() {
      this.getHistory();
      this.checkCart();
    };
    

  render() {
      let filterProduct = this.state.history.filter((history)=>{
        return history.cashier.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
      })
    return (
       

        <div className="main">      
        <div className="clock">
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} />
        </div>


        <div className="container">
            <div className="row">
            <div className="col-4">
            <div class="cardhistory">
                <img class="img" src="http://localhost:4000/uploads/cardpink.png" alt="Avatar" />
                <div class="centeredpink">Today's Income</div>
                <div class="pricepink">RP. 1.000.000</div>
                <div class="persenpink">+2% Yesterday</div>
                </div>
            </div> 
            <div className="col-4">
                <div class="cardhistory">
                <img class="img" src="http://localhost:4000/uploads/cardblue.png" alt="Avatar" />
                <div class="centeredblue">Orders</div>
                <div class="priceblue">3.270 Order</div>
                <div class="persenblue">+5% Last Week</div>
                </div>
            </div> 
            <div className="col-4">
                <div class="cardhistory">
                <img class="img" src="http://localhost:4000/uploads/cardviolet.png" alt="Avatar" />
                <div class="centeredviolet">This Years's Inncome</div>
                <div class="priceviolet">RP. 100.000.000</div>
                <div class="persenviolet">+10% Yesterday</div>
                </div>
            </div>

            </div>
            <div className="row">
            <img class="img" src="http://localhost:4000/uploads/grafik.png" width="80%" alt="Avatar" />
            </div>
        </div>

        

        <div id="searching">
        <input name="name"  type="search" placeholder="Search product here.." onChange={this.onChangeSearch} />
        </div>

                            


         
    
        {/* MODAL DETAIL */}
                <div className="modal fade" id="ModalDetailOrder" tabIndex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">
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
                    <th>Cashier Name</th>
                    <th>Invoice Code</th>
                    <th>Total Order Price</th>
                    <th>Time</th>
                    {/* <th>Picture</th> 
                    <th></th> */}
                    </tr>
                </thead>
                <tbody>
                  
                    {filterProduct.map(product =>{
                        return<ProductOrder key={product.id} data={product} buy={this.handleBuy} submit={this.handleBuySubmit} detail={this.handleDetailOrder}/>
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

export default History;