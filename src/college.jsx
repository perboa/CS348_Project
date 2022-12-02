import React from 'react';
import "./index.css";
import UWLogo from './uwlogo.jsx';
import ColumbiaLogo from './columbialogo';
import { Card, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import axios from 'axios';
import { useParams } from "react-router";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class College extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          name: null,
          city: null,
          state: null,
          country: null,
          url: null,
          rating: null,
          studentLife: null,
          academics: null,
          difficulty: null,
          reputation: null,
          reviews: []
        };

        this.getBaseInfo = this.getBaseInfo.bind(this);
        this.getSummaryInfo = this.getSummaryInfo.bind(this);
        this.getReviews = this.getReviews.bind(this);
      }

      componentDidMount() {
        let id = this.props.match.params.id;
        this.getBaseInfo(id);
        this.getSummaryInfo(id);
        this.getReviews(id);
      };

      getBaseInfo = (id) => {
        axios.get('http://127.0.0.1:5000/colleges/base-info', {
              params: {
                ID: id
              }
              })
              .then((res) => {
                let data = res.data;
                this.setState({
                  name: data.name,
                  city: data.city,
                  state: data.state,
                  country: data.country,
                  logo: data.logo_URL
                });
              })
              .catch((err) => {
                // handle error
                console.log(err);
              })
      };

      getSummaryInfo = (id) => {
        axios.get('http://127.0.0.1:5000/colleges/summary', {
              params: {
                ID: id
              }
              })
              .then((res) => {
                let data = res.data;
                this.setState({
                  rating: data.rating,
                  studentLife: data.student_life,
                  academics: data.academics,
                  difficulty: data.difficulty,
                  reputation: data.reputation
                });
              })
              .catch((err) => {
                // handle error
                console.log(err);
              })
      };

      getReviews = (id) => {
        axios.get('http://127.0.0.1:5000/colleges/reviews/all', {
              params: {
                ID: id
              }
              })
              .then((res) => {
                let data = res.data;
                this.setState({
                  rating: data.rating,
                  studentLife: data.student_life,
                  academics: data.academics,
                  difficulty: data.difficulty,
                  reputation: data.reputation
                });
              })
              .catch((err) => {
                // handle error
                console.log(err);
              })
      };


      render() {
        const name = this.state.name;
        const location = this.state.city + ', ' + this.state.state + ', ' + this.state.country;
        let rating = this.state.rating;
        const studentLife = this.state.studentLife;
        const academics = this.state.academics;
        const reputation = this.state.reputation;
        const difficulty = this.state.difficulty;
        const logo = this.state.logo;

        rating = rating * 100;

        return (
            <div id="page" className="w-full h-screen flex flex-col justify-items-center">
                <div id="college-info" className="pt-10 basis-2/5 flex flex-col">
                    <div id="base-info" className='pr-20 justify-end w-full h-1/2 flex flex-row items-center'>
                      <div id="base-text" className='flex flex-col justify-center'>
                        <h1 className='font-sans subpixel-antialiased font-semibold text-8xl text-slate-900 text-end'> {name} </h1>
                        <p className='font-sans subpixel-antialiased font-semibold text-3xl text-slate-700 text-end m-5'> {location} </p>
                      </div>
                      {logo == "University of Waterloo.png" ?
                        <UWLogo className="mr-10 ml-10 w-52 h-52 z-50"/>
                       :
                        <ColumbiaLogo className="mr-10 ml-10 w-52 h-52 z-50"/>
                       }
                    </div>
                    <div id="summary-statistics" className="flex flex-row justify-center pt-20">
                      <Card className="w-48 m-5 flex flex-col justify-center align-center" shadow="sm" p="md" radius="md" withBorder>
                        <FontAwesomeIcon className="text-blue-800 h-8 text-center" icon={icon({name: 'thumbs-up', style:'solid'})}/>
                        <h2 className='text-center text-gray-900 font-bold text-2xl'> Rating </h2>
                        <h3 className='text-center text-gray-800 font-semibold text-2xl'> {rating}% </h3>
                      </Card>
                      <Card className="w-48 m-5 flex flex-col justify-center" shadow="sm" p="lg" radius="md" withBorder>
                      <FontAwesomeIcon className="text-blue-800 h-8 text-center" icon={icon({name: 'face-smile', style:'solid'})}/>
                        <h2 className='text-center text-gray-900 font-bold text-2xl'> Student Life </h2>
                        <h3 className='text-center text-gray-800 font-semibold text-2xl'> {studentLife} </h3>
                      </Card>
                      <Card className="w-48 m-5 flex flex-col justify-center" shadow="sm" p="lg" radius="md" withBorder>
                      <FontAwesomeIcon className="text-blue-800 h-8 text-center" icon={icon({name: 'book', style:'solid'})}/>
                        <h2 className='text-center text-gray-900 font-bold text-2xl'> Academics </h2>
                        <h3 className='text-center text-gray-800 font-semibold text-2xl'> {academics} </h3>
                      </Card>
                      <Card className="w-48 m-5 flex flex-col justify-center" shadow="sm" p="lg" radius="md" withBorder>
                      <FontAwesomeIcon className="text-blue-800 h-8 text-center" icon={icon({name: 'gem', style:'solid'})}/>
                        <h2 className='text-center text-gray-900 font-bold text-2xl'> Difficulty </h2>
                        <h3 className='text-center text-gray-800 font-semibold text-2xl'> {difficulty} </h3>
                      </Card>
                      <Card className="w-48 m-5 flex flex-col justify-center" shadow="sm" p="lg" radius="md" withBorder>
                      <FontAwesomeIcon className="text-blue-800 h-8 text-center" icon={icon({name: 'handshake', style:'solid'})}/>
                        <h2 className='text-center text-gray-900 font-bold text-2xl'> Employer Reputation </h2>
                        <h3 className='text-center text-gray-800 font-semibold text-2xl'> {reputation} </h3>
                      </Card>
                    </div>
                </div>
                <div id="reviews" className="basis-3/5 flex flex-col items-center">
                    <div id="header" className='w-full h-20 flex flex-row-reverse pr-52 pt-1 '>
                      <Button className='hover:bg-blue-800 bg-blue-600 h-[4rem] w-40 text-xl'> Write Review </Button>
                    </div>
                    <div id="list" className="w-[65rem] flex flex-col align-center">
                      <Card className="w-full flex flex-col" shadow="sm" p="lg" radius="md" withBorder>
                        
                      </Card>
                    </div>
                </div>
            </div>
        );
      }
  }

export default withParams(College);