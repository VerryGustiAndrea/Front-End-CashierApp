import React, { Component } from "react";
import '../styles/HeadFoot.css'
class Header extends Component {
    render(){

        return (
            <div className="headfoot">
            <h1> {this.props.title}</h1>
            </div>
        )
    }

}

export default Header