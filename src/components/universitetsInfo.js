import React from 'react';
import {Row, Col, Well, Button} from 'react-bootstrap';


class UniversitetsInfo extends React.Component{
  constructor(){
    super();
    this.state = {
      isClicked:false
    };
  }
  onReadMore(){
    this.setState({
      isClicked:true
    })
  }
  //---link functions-------


  render() {
    return(
      <Well>
        <Row style={{width: '80vw'}}>
            <h6>{this.props.title}</h6>
            <p>{(this.props.description.length> 50 && !this.state.isClicked)?(this.props.description.substring(0,50)):(this.props.description)}
              <btton className="link" onClick={this.onReadMore.bind(this)}>
                {(!this.state.isClicked && this.props.description !== null && this.props.description.length > 50)?('...read more'):('')}
              </btton>
            </p>
        </Row>
      </Well>
    )
  }
}

export default UniversitetsInfo;
