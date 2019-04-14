import React, { Component, Fragment } from 'react';
import Loader from 'react-loader-spinner';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

import movieService from './../../../services/movie-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes, movieTypesName } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class MovieDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: null,
            isLoading: false
        };

        this.getDate = this.getDate.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true });

        movieService.getMovieById(this.props.match.params.movieId)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    const movie = response.data.movie;
                    movie.releaseDate = new Date(movie.releaseDate);
                    this.setState({ movie, isLoading: false });
                });
            } else {
                res.json().then(() => {
                    this.props.notifHandler(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/movies'); }, 2000);
                });
            }
          });
    }

    getDate(date) {
        const parsedDate = new Date(date);
        return `${parsedDate.getDate()}-${parsedDate.getMonth() + 1}-${parsedDate.getFullYear()}`;
    }

    render() {
        return (
            this.state.isLoading ?
            <Loader type="Ball-Triangle" color="black" height="120" />
            :
            <MDBContainer style={{ 'background-color': "white", opacity: "0.9 " }}>
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="3">{this.state.movie.name}</MDBCol>
                    <MDBCol md="3">{movieTypesName[this.state.movie.type]}</MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6">
                        <img src={this.state.movie.cover} alt="" className="img-fluid" />
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6"><span>{this.state.movie.info}</span></MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol  md="3">Release date: {`${this.state.movie.releaseDate.getDate()} - ${this.state.movie.releaseDate.getMonth() + 1} - ${this.state.movie.releaseDate.getFullYear()}`}</MDBCol>
                    <MDBCol md="3">Director: {this.state.movie.director ? this.state.movie.director : 'Unknown'}</MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="3">
                        Writers:
                        {
                            this.state.movie.writers.lenght > 0 ?
                            this.state.movie.writers.map((writer, index) => {
                                return (
                                    <div key={index}>{writer}</div>
                                );
                            })
                            : ' Unknown'
                        }
                    </MDBCol>
                    <MDBCol md="3">
                        Actors:
                        {
                            this.state.movie.actors.length > 0 ?
                            this.state.movie.actors.map((actor, index) => {
                                return (
                                    <div key={index}>{actor}</div>
                                );
                            })
                            : ' Unknown'
                        }
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    };
};

export default MovieDetails;
