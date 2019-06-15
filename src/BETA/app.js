import React, { Component } from 'react';
import './App.css';
import LeftMenuStudent from './komponente/Student/LeftMenuStudent.js';
import IssueList from './komponente/Student/issueList.js';
import FAQ from './komponente/Student/FAQ.js';
import Drafts from './komponente/Student/Drafts.js';
import Archived from './komponente/Student/ArchivedPart.js'
import LeftMenuSS from './komponente/SS/LeftMenuSS.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeContentId: 1
    };
  }





  onChangeActiveId = (id) => {
    this.setState({
      activeContentId: id,
    })
  };

  render() {
    const { open } = this.state;
    return (
      <div >

        <div className="App">

          <div className="row">
            <div id="mainBeta">
              <div id="leftBeta">
                <LeftMenuStudent triggerChangeActiveId={this.onChangeActiveId} />
              </div>
              <div id="rightBeta">

                <div
                  id="TrackIssuesContent"
                  style={{ display: this.state.activeContentId == 1 ? 'inherit' : 'none' }}
                ><IssueList />
                </div>
                <div
                  id="DraftsContent"
                  style={{ display: this.state.activeContentId == 2 ? 'inherit' : 'none' }}
                ><Drafts />
                </div>
                <div
                  id="Archived"
                  style={{ display: this.state.activeContentId == 3 ? 'inherit' : 'none' }}
                > <Archived />
                </div>

                <div
                  id="FAQContent"
                  style={{ display: this.state.activeContentId == 4 ? 'inherit' : 'none' }}
                >
                  <FAQ />
                </div>



              </div>
            </div>

          </div>



        </div>
        
      </div>
    );
  }
}

export default App;