import React from "react";
import { connect } from "react-redux";

class Profile extends React.Component {
    state = {
        number : 0
    }

    onChangeNumber = e => {
        let number = parseInt(e.targetnumber) || 0
        this.setState({
            number 
        })
    }


  render() {
    const { count } = this.props;
    return (
      <div className="main">
        <h1>{count.number}</h1>

        <button> ADD </button>
        <button> SUBTRACK </button>
        <br />
        <input type = "number" onChange={this.onChangeNumber}></input>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    count: state.count,
    user: state
  };
};

export default connect(mapStateToProps)(Profile);
