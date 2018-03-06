import React, { Component } from 'react';
import {Glyphicon,FormGroup, form, FormControl,Col, Row, Button} from 'react-bootstrap';



class Searchbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
      list: []
    };
  }



  handleChange(e) {
    this.setState({ value: e.target.value });
    console.log(this.state.value);
    this.search(e.target.value)
  }
  search(searched){
    const list=['hei', 'heei', 'piiikk']
    let result=[]
    if(searched.length >1){
      for (let i = 0; i < list.length; i++) {
        if (list[i].includes(searched) || list[i] === searched){
          result.push(list[i])
        }
      }
    }


    console.log(result);
    this.setState({list: result})

    return result
}
clearSearch(result){
  this.setState({value:result, list:[]})
}
goToSearch(){

}
  render() {
    let result = this.state.list.map(function(result){
      return(
        <div className="searchItem" onClick={this.clearSearch.bind(this,result)}>
          <Glyphicon style={{marginRight: 5}} glyph="glyphicon glyphicon-map-marker" />
          <p>{result}</p>
        </div>


    );
    }, this)

    return (
      <form className="searchbar">

          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Search"
            onChange={this.handleChange}
          />
          <div  className="search-btn" onClick={this.goToSearch.bind(this)}>
            <Glyphicon glyph="glyphicon glyphicon-search" />
          </div>
        { !result.length?(''):(
            <div style={{backgroundColor: 'white', borderRadius: 2, padding:2, marginTop: 2}}>
              {result}
            </div>
          )}

      </form>
    );
  }
}
export default Searchbar;
