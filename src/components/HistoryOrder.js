import React, { Component } from "react";
import ProductOrder from "./HistoryData";
import "../styles/History.css";
import axios from "axios";
import Clock from "react-live-clock";
import { connect } from "react-redux";
import { getAllHistory, getIncome } from "../redux/action/history";


// const URL_HISTORY_LIST = "http://localhost:4000/api/cart/history";
const URL_DETAIL_ORDER = "http://localhost:4000/api/cart/orderdetail";



class History extends Component {
  state = {
    code: 0,
    orderdetail: [],

    history: [],
    info : [],
    keyword: "",
    searching: "",

    date: new Date(),
    category: {
      name: ""
    },

    detailProduct: {
      id: 0,
      name: "",
      id_category: 0,
      description: "",
      stock: 0,
      price: 0,
      images: "",
      updated_at: new Date(),
      category: ""
    },

  };

  //DETAIL PRODUCT

  handleDetail = data => {
    this.setState({
      detailProduct: data
    });
  };

  //GET HISTORY
  getHistory = async() => {
    await this.props.dispatch(getAllHistory())
    console.log(this.props.hitory)
    this.setState({
      history: this.props.history.historyData
    });
  }


  //HANDLE INCOME

   getIncome = async() => {
    await this.props.dispatch(getIncome())
    this.setState({
      info: this.props.history.incomeData
    });
  }


  handleBuySubmit(e) {
    console.log(this.state.buyProduct);
    e.preventDefault();
    this.buyProduct();
  }
  //END BUY

  //SEARCH
  onChangeSearch = e => {
    const keyword = e.target.value;
    this.setState({
      keyword: keyword
    });
  };

  //HANDLE DETAIL ORDER
  handleDetailOrder = (data) => {
    console.log(data)
      this.setState({
        code : data
      })
    axios.get(`${URL_DETAIL_ORDER}/${data.invoice}`).then(res => {
      this.setState({
        orderdetail: res.data});
    });
  }

  componentDidMount() {
    this.getHistory();
    this.getIncome();

  }

  render() {
    let filterProduct = this.state.history.filter(history => {
      return (
        history.cashier
          .toLowerCase()
          .indexOf(this.state.keyword.toLowerCase()) !== -1
      );
    });
    return (
      <div className="main">
        <div className="clock">
          <Clock format={"HH:mm:ss"} ticking={true} timezone={"Asia/Jakarta"} />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="cardhistory">
                <img
                  className="img"
                  src="http://localhost:4000/uploads/cardpink.png"
                  alt="Avatar"
                />
                <div className="centeredpink">Today's Income</div>
                <div className="pricepink">Rp. {this.state.info.total_today}</div>
                <div className="persenpink">{Math.ceil(this.state.info.persen)}% Yesterday</div>
              </div>
            </div>
            <div className="col-4">
              <div className="cardhistory">
                <img
                  className="img"
                  src="http://localhost:4000/uploads/cardblue.png"
                  alt="Avatar"
                />
                <div className="centeredblue">Orders</div>
                <div className="priceblue">{this.state.info.total_order_thisweek}</div>
                <div className="persenblue">{Math.ceil(this.state.info.persen_order)}% Last Week</div>
              </div>
            </div>
            <div className="col-4">
              <div className="cardhistory">
                <img
                  className="img"
                  src="http://localhost:4000/uploads/cardviolet.png"
                  alt="Avatar"
                />
                <div className="centeredviolet">This Years's Inncome</div>
                <div className="priceviolet">RP. {this.state.info.total_income_year}</div>
                <div className="persenviolet">{Math.ceil(this.state.info.persen_year)}% Last Year</div>
              </div>
            </div>
          </div>
          <div className="row">
            <img
              className="img"
              src="http://localhost:4000/uploads/grafik.png"
              width="80%"
              alt="Avatar"
            />
          </div>
        </div>

        <div id="searching">
          <input
            name="name"
            type="search"
            placeholder="Search order here..."
            onChange={this.onChangeSearch}
          />
        </div>

        {/* MODAL DETAIL */}
        <div
          className="modal fade"
          id="ModalDetailOrder"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="largeModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">
                  Detail Order
                </h4>
                <p>Receipt No. {this.state.code.invoice}</p>
              </div>

              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Cashier</h4>
                  <h5 className="card-title">
                    {this.state.code.cashier}
                  </h5>
                </div>
                <table className="table border-none">
                  <tbody>
                    {this.state.orderdetail.map(orderdetail => {
                      return (
                        <tr key={orderdetail.id}>
                          <td className="text-left">{orderdetail.product} {orderdetail.qty}x</td>
                          <td className="text-right">{orderdetail.total_price}</td>
                        </tr>
                      );
                      
                    })}
                        <tr>
                          <td></td>
                          <td className="text-right">Total :  IDR .{this.state.code.total_price}</td>
                        </tr>
                          <td className="text-left">Payment : Cash</td>
                          <td></td>
                  </tbody>
                </table>
                        <tr className="text-center">
                        <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#ModalAdd"  >Print</button>
                        <p>Or</p>
                        <button type="button" className="btn btn-outline-warning" data-toggle="modal" data-target="#AddCategory"  >Send Email</button>
                        </tr>
                </div>
                
              <br/>
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
                  {filterProduct.map(product => {
                    return (
                      <ProductOrder
                        key={product.id}
                        data={product}
                        submit={this.handleBuySubmit}
                        detail={this.handleDetailOrder}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({  history, income }) => {
  return {
    history,
    income
  };
};
export default connect(mapStateToProps)(History);
