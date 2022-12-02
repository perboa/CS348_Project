import React from 'react';
import "./index.css";
import UWLogo from './uwlogo.jsx';
import ColumbiaLogo from './columbialogo';
import { Card, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import axios from 'axios';
import { useParams } from "react-router";
import Review from "./review";
import { Modal, Group, Radio, Grid, Textarea } from '@mantine/core';

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
        this.onChangeRec = this.onChangeRec.bind(this);
        this.onChangeRep = this.onChangeRep.bind(this);
        this.onChangeDiff = this.onChangeDiff.bind(this);
        this.onChangeSL = this.onChangeSL.bind(this);
        this.onChangeEP = this.onChangeEP.bind(this);
        this.onChangeRev = this.onChangeRev.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.postReview = this.postReview.bind(this);
      }

      componentDidMount() {
        let id = this.props.params.id;
        this.getBaseInfo(id);
        this.getSummaryInfo(id);
        this.getReviews(id);
      };

      onChangeRec(event) {
        this.setState({
          rating: event.target.value
        });
      }

      onChangeDiff(event) {
        this.setState({
          difficulty: event.target.value
        });
      }

      onChangeSL(event) {
        this.setState({
          studentLife: event.target.value
        });
      }

      onChangeRep(event) {
        this.setState({
          academics: event.target.value
        });
      }

      onChangeEP(event) {
        this.setState({
          employerRating: event.target.value
        });
      }

      onChangeRev(event) {
        this.setState({
          review: event.target.value
        });
      }

      formSubmit(event) {
        event.preventDefault();
      }

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
                  logo: data.logo_url
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
        axios.get('http://127.0.0.1:5000/colleges/reviews/all_ids', {
              params: {
                ID: id
              }
              })
              .then((res) => {
                let data = res.data;
                this.setState({
                  reviews: data.reviews,
                });
              })
              .catch((err) => {
                // handle error
                console.log(err);
              })
      };

      postReview = () => {
        axios.post('http://127.0.0.1:5000/review', {
          // collegeId
          // userID
          rating: this.state.rating,
          reputation: this.state.reputation,
          studentLife: this.state.studentLife,
          review: this.state.review,
          employerRating: this.state.employerRating,
          difficulty: this.state.difficulty
      })
      }


      render() {
        const name = this.state.name;
        const location = this.state.city + ', ' + this.state.state + ', ' + this.state.country;
        let rating = this.state.rating;
        let studentLife = this.state.studentLife;
        let academics = this.state.academics;
        let reputation = this.state.reputation;
        let difficulty = this.state.difficulty;
        const logo = this.state.logo;

        studentLife = Number(studentLife).toFixed(2);
        academics = Number(studentLife).toFixed(2);
        reputation = Number(studentLife).toFixed(2);
        difficulty = Number(studentLife).toFixed(2);
        rating = (rating * 100).toFixed(2);

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
                      <Modal
                      title="Write a Review"
                      size="100%"
                      opened={this.state.opened}
                      onClose={() => this.setState({ opened: false })}>
                      <Grid grow gutter="xs">
                        <Grid.Col span={1}>
                          <Radio.Group
                            name="Recommendation"
                            label="Recommend?"
                            description="Would you recommend this university?"
                            size='xs'
                            withAsterisk
                            id='recommendation'>
                            <Radio value="1" label="Yes" checked={this.state.rating} onChange={this.onChangeRec}/>
                            <Radio value="0" label="No" checked={this.state.rating} onChange={this.onChangeRec}/>
                          </Radio.Group>
                        </Grid.Col>
                        <Grid.Col span={1}>
                          <Radio.Group
                            name="difficulty"
                            label="Difficulty"
                            description="How hard is the coursework?"
                            size='xs'
                            id='difficulty'
                          >
                            <Radio value="awful" label="Awful" checked={this.state.difficulty="awful"} onChange={this.onChangeDiff}/>
                            <Radio value="bad" label="Bad" checked={this.state.difficulty="bad"} onChange={this.onChangeDiff}/>
                            <Radio value="neutral" label="Ok" checked={this.state.difficulty="neutral"} onChange={this.onChangeDiff}/>
                            <Radio value="good" label="Good" checked={this.state.difficulty="good"} onChange={this.onChangeDiff}/>
                            <Radio value="great" label="Great" checked={this.state.difficulty="great"} onChange={this.onChangeDiff}/>
                          </Radio.Group>
                        </Grid.Col>
                        <Grid.Col span={1}>
                          <Radio.Group
                            name="employer_reputation"
                            label="Employer Reputation"
                            description="How is the job market after graduating?"
                            size='xs'
                            id='employer_reputation'
                          >
                            <Radio value="awful" label="Awful" checked={this.state.employerRating="awful"} onChange={this.onChangeEP}/>
                            <Radio value="bad" label="Bad" checked={this.state.employerRating="bad"} onChange={this.onChangeEP}/>
                            <Radio value="neutral" label="Ok" checked={this.state.employerRating="neutral"} onChange={this.onChangeEP}/>
                            <Radio value="good" label="Good" checked={this.state.employerRating="good"} onChange={this.onChangeEP}/>
                            <Radio value="great" label="Great" checked={this.state.employerRating="great"} onChange={this.onChangeEP}/>
                          </Radio.Group>
                        </Grid.Col>
                        <Grid.Col span={1}>
                          <Radio.Group
                            name="academics"
                            label="Academics"
                            description="What is the level of education?"
                            size='xs'
                            id='academics'
                          >
                            <Radio value="awful" label="Awful" checked={this.state.academics="awful"} onChange={this.onChangeRep}/>
                            <Radio value="bad" label="Bad" checked={this.state.academics="bad"} onChange={this.onChangeRep}/>
                            <Radio value="neutral" label="Ok" checked={this.state.academics="neutral"} onChange={this.onChangeRep}/>
                            <Radio value="good" label="Good" checked={this.state.academics="good"} onChange={this.onChangeRep}/>
                            <Radio value="great" label="Great" checked={this.state.academics="great"} onChange={this.onChangeRep}/>
                          </Radio.Group>
                        </Grid.Col>
                        <Grid.Col span={1}>
                          <Radio.Group
                            name="student_life"
                            label="Student Life"
                            description="How would you rate the student life?"
                            size='xs'
                            id='student_life'
                          >
                            <Radio value="awful" label="Awful" checked={this.state.studentLife == "awful"} onChange={this.onChangeSL}/>
                            <Radio value="bad" label="Bad" checked={this.state.studentLife == "bad"} onChange={this.onChangeSL}/>
                            <Radio value="neutral" label="Ok" checked={this.state.studentLife == "neutral"} onChange={this.onChangeSL}/>
                            <Radio value="good" label="Good" checked={this.state.studentLife == "good"} onChange={this.onChangeSL}/>
                            <Radio value="great" label="Great" checked={this.state.studentLife == "great"} onChange={this.onChangeSL}/>
                          </Radio.Group>
                        </Grid.Col>
                      </Grid>
                      <Grid justify="center" align="center">
                        <Grid.Col style={{ minHeight: 120 }}>
                          <Textarea id="review" placeholder='Write a Review' radius="xs" minRows={4} onChange={this.onChangeRev}></Textarea>
                        </Grid.Col>
                      </Grid>
                      <Button className="hover:bg-blue-800 bg-blue-600 h-[4rem] w-40 text-xl" onClick = {() => this.setState({ opened: false })}> Submit</Button>
                      </Modal>
                      <Button onClick = {() => this.setState({ opened: true })} className='hover:bg-blue-800 bg-blue-600 h-[4rem] w-40 text-xl'> Write Review </Button>
                    </div>
                    <div id="list" className="w-[65rem] flex flex-col align-center space-y-3">
                     {this.state.reviews.map((review) => (
                        <Review college_id={this.props.params.id} user_id={review}/>
                     ))}
                    </div>
                </div>
            </div>
        );
      }
  }

export default withParams(College);