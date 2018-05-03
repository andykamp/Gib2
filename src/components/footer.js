"user strict"
import React from 'react';
import '../App.css';

class Footer extends React.Component{
  render(){
    return(
        <div className="footer">
          <img classname="shadowed" src={require('../images/logo.png')} style={{height:20}} />

          <h4>Laget av studenter ved Geomatikk, I&IKT</h4>
          <h6>Anders Kampenes, Carl Emil Hattestad, Anna Kjæmpenes, Jørgen Mortensen og Kristoffer Saastad</h6>

        </div>
    );
  }
}
export default Footer;
