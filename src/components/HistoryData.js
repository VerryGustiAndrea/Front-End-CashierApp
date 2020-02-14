import React, { Fragment } from "react";
import '../styles/HeadFoot.css'


const ProductList = (props) => {
        return (
            <Fragment>
            <tr>
                <td>{props.data.id}</td>
                <td>{props.data.cashier}</td>
                <td>{props.data.invoice}</td>
                <td>{props.data.total_price}</td>
                <td>{props.data.date}</td>
                {/* <td><img src={props.data.images} alt="" height= "50" width= "50"></img></td> */}
                <td><button type="button" className="btn btn-outline-info" data-toggle="modal" onClick={() => props.detail(props.data.invoice)} data-target="#ModalDetailOrder">Detail Order</button>
                {/* <button type="button" className="btn btn-outline-secondary"  data-toggle="modal" onClick={() => props.detail(props.data)} data-target="#ModalDetail">Detail</button> */}
                </td>
             </tr>
             </Fragment>
        )


}

export default ProductList