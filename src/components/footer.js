"user strict"
import React from 'react';
import '../App.css';

class Footer extends React.Component{
  render(){
    return(
        <div className="footer">
          <img classname="shadowed" src={require('../images/logo.png')} style={{height: 100}} />

          <h1>Laget av studenter ved Geomatikk, I&IKT</h1>
          <h4>Anders Kampenes, Carl Emil Hattestad, Anna Kjæmpenes, Jørgen Mortensen og Kristoffer Saastad</h4>

        </div>
    );
  }
}
export default Footer;
