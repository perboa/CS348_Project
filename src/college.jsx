import React from 'react';
import "./index.css";

class College extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: null,
          city: null,
          state: null,
          country: null,
          
        };
      }
    
      render() {
        return (
          <div class="h-screen w-screen flex">
            {/* put header here */}
            <div class="flex">
                <div class="base-info">
                    
                </div>
                <div class="reviews"></div>
            </div>
          </div>
        );
      }
  }

export default College;