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
            <div id="page" className="w-screen h-screen flex flex-col justify-items-center">
                <div id="college-info" className="border-2 border-rose-500 basis-2/5 bg-indigo-200 flex flex-column">
                    <div id="base-info" className='w-full h-1/2 border-2 border-cyan-500 flex flex-row items-center'>
                      <h1 className='font-sans subpixel-antialiased font-semibold text-5xl text-slate-900'> University of Waterloo </h1>
                      <img src={require("logos/University of Waterloo.png")} className=''></img>
                    </div>
                </div>
                <div id="reviews" className="basis-3/5 bg-red-200 flex">
                    
                </div>
            </div>
        );
      }
  }

export default College;