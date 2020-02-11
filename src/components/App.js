import React, { Component } from 'react';
import HeadFoot from "./HeadFoot";
import "../styles/App.css";
import axios from 'axios'

 



export default class PersonList extends Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (

      <div className="main">
        <HeadFoot title="Kedai Kopi Kini"/>
        <p>
          lorem bla blaa
        </p>

        { this.state.persons.map(person => <li>{person.name}</li>)}
        <HeadFoot title="Footer"/>
      </div>



    )
  }
}



//Default Value Props 
// HelloMessage.defaultProps = {
//   batch : 14,
//   city : "Depok"
// };

// export default HelloMessage;