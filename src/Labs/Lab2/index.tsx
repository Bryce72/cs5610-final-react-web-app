import React from 'react';
import "./index.css";
import ForegroundColors from './ForegroundColors';
import BackgroundColors from './BackgroundColors';
import Borders from './Borders';
import Padding from './Padding';
import Margins from './Margins';
import Corners from './Corners';
import Dimensions from './Dimensions';
import Positions from './Positions';
import Zindex from './Zindex';
import Float from './Float';
import GridLayout from './GridLayout';
import Flex from './Flex';
import ReactIcons from './ReactIcons';
import BootstrapGrids from './BootstrapGrids';
import ScreenSizeLabel from './ScreenSizeLabel';
import BootstrapTables from './BootstrapTables';
import BootstrapLists from './BootstrapLists';
import BootstrapForms from './BootstrapForms';
import BootstrapNavigation from './BootstrapNavigation';


export default function Lab2() {
  return (
    <div id="container">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <p>
        Style attribute allows configuring look and feel
        right on the element. Although it's very convenient
        it is considered bad practice and you should avoid
        using the style attribute
      </p>

      <div id="wd-css-document-structure">
        <div className="wd-selector-1">
          <h3>Document structure selectors</h3>
          <div className="wd-selector-2">
            Selectors can be combined to refer elements in particular
            places in the document
            <p className="wd-selector-3">
              This paragraph's red background is referenced as
              <br />
              .selector-2 .selector3<br />
              meaning the descendant of some ancestor.<br />
              <span className="wd-selector-4">
                Whereas this span is a direct child of its parent
              </span><br />
                You can combine these relationships to create specific 
                styles depending on the document structure
            </p>
          </div>
        </div>
      </div>
      <div>
        <ForegroundColors />
      </div>
      <div>
        <BackgroundColors />
      </div>
      <div>
        <Borders />
      </div>
      <div>
        <Padding />
      </div>
      <div>
        <Margins />
      </div>
      <div>
        <Corners />
      </div>
      <div>
        <Dimensions />
      </div>
      <div>
        <Positions />
      </div>
      <div>
        <Zindex />
      </div>
      <div>
        <Float />
      </div>      
      <div>
        <GridLayout />
      </div>      
      <div>
        <Flex />
      </div>      
      <div>
        <ReactIcons />
      </div>      
      <div>
        <BootstrapGrids />
      </div>      
      <div>
        <ScreenSizeLabel />
      </div>      
      <div>
        <BootstrapTables />
      </div>      
      <div>
        <BootstrapLists />
      </div>      
      <div>
        <BootstrapForms />
      </div>      
      <div>
        <BootstrapNavigation />
      </div>      
</div>
  );
}

