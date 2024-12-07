import React from "react";
import "./index.css";

export default function BootstrapLists() {
    return (
<div id="wd-css-hyperlink-list">
  <h3>Favorite books</h3>
  <div className="list-group">
    <a href="https://en.wikipedia.org/wiki/Dune_(novel)" 
       className="list-group-item list-group-item-action active">
       Dune</a>
    <a href="https://en.wikipedia.org/wiki/The_Lord_of_the_Rings" 
       className="list-group-item list-group-item-action">
       Lord of the Rings</a>
    <a href="https://en.wikipedia.org/wiki/The_Forever_War" 
       className="list-group-item list-group-item-action">
       The Forever War</a>
    <a href="https://en.wikipedia.org/wiki/2001:_A_Space_Odyssey_(novel)" 
       className="list-group-item list-group-item-action">
       2001 A Space Odyssey</a>
    <a href="https://en.wikipedia.org/wiki/Ender%27s_Game" 
       className="list-group-item list-group-item-action disabled">
       Ender's Game</a>
  </div>
</div>

    );
}