import React from 'react';

 let loggedIn = true;
 function TernaryOperator() {
 return(
    <div id="wd-ternary-operator">
       <h4>Logged In</h4>
       { loggedIn ? <p>Welcome</p> : <p>Please login</p> } <hr/>
    </div>
 );}

export default TernaryOperator;