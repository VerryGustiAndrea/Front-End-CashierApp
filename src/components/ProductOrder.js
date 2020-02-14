import React, { Fragment } from "react";
import '../styles/HeadFoot.css'


const ProductList = (props) => {
        return (
            <Fragment>
            <tr>
                <td>{props.data.id}</td>
                <td>{props.data.name}</td>
                <td>{props.data.category}</td>
                <td>{props.data.stock}</td>
                <td>{props.data.price}</td>
                <td><img src={props.data.images} alt="" height= "50" width= "50"></img></td>
                <td><button type="button" className="btn btn-outline-info"  onClick={() => props.buy(props.data.id) }  >Buy</button>
                <button type="button" className="btn btn-outline-secondary"  data-toggle="modal" onClick={() => props.detail(props.data)} data-target="#ModalDetail">Detail</button>
                </td>
             </tr>
             </Fragment>
        )


}

export default ProductList