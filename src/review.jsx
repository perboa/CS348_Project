import React from 'react';
import "./index.css";
import { Card, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import axios from 'axios';


class Review extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          name: null,
          body: null,
          recommend: null,
          studentLife: null,
          academics: null,
          difficulty: null,
          reputation: null,
        };


        this.getReview = this.getReview.bind(this);
      }

      componentDidMount() {
        this.getReview();
      };

      getReview() {
        axios.get('http://127.0.0.1:5000/review', {
              params: {
                user_id: this.props.user_id,
                college_id: this.props.college_id
              }
              })
              .then((res) => {
                let data = res.data;
                this.setState({
                  name: data.username,
                  body: data.body,
                  recommend: data.recommend,
                  difficulty: data.difficulty,
                  studentLife: data.student_life,
                  academics: data.academics,
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
        const studentLife = this.state.studentLife;
        const academics = this.state.academics;
        const reputation = this.state.reputation;
        const difficulty = this.state.difficulty;
        const body = this.state.body;

        return (
            <Card className="m-10" shadow="md" p="lg" radius="md">
                <h1 className="font-bold text-2xl"> {name} </h1>
                <p> {body} </p>
            </Card>
        );
      }
  }

export default Review;