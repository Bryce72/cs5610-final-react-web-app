export default function BootstrapNavigation() {
  return(
    <div id="wd-css-navigating-with-tabs">
  <h2>Tabs</h2>
  <ul className="nav nav-tabs">
    <li className="nav-item">
        <a className="nav-link active" href="#">Active</a>
    </li>
    <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
    </li>
    <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
    </li>
    <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
    </li>
    </ul>
    <div id="wd-css-navigating-with-cards">
  <h2>Cards</h2>
  <div className="card"
       style={{ width: "18rem" }}>
    <img src="images/Guass.png"
         className="card-img-top" />
    <div className="card-body">
      <h5 className="card-title">
          Magnetometer!
      </h5>
      <p className="card-text">
        A magnetometer used by Carl Friedrich Gauss
      </p>
      <a href="https://en.m.wikipedia.org/wiki/File:A_magnetometer_used_by_Carl_Friedrich_Gauss,_from_Gerlach_und_F._Traum%C3%BCller,_1899.png" className="btn btn-primary">
        Boldly Go
      </a>
    </div>
  </div>
</div>

    </div>
  );
}