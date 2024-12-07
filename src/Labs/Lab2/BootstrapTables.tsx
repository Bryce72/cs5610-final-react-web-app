import React from "react";
import "./index.css";

export default function BootstrapTables() {
    return (
<div id="wd-css-responsive-tables">
  <h2>Responsive tables</h2>
  <div className="table-responsive">
    <table className="table">
      <thead>
        <tr><th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
            <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
            <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
        </tr>
      </thead>
      <tbody>
        <tr>
           <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
           <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
           <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

    );
}