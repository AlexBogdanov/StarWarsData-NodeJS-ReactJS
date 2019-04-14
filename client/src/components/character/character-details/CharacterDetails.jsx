import React, { Component, Fragment } from 'react';
import Loader from 'react-loader-spinner';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

import characterService from './../../../services/character-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class CharacterDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            character: null,
            isLoading: false
        };
    }

    componentWillMount() {
        this.setState({ isLoading: true });

        characterService.getCharacterById(this.props.match.params.characterId)
          .then(res => {
              if (res.status === OK) {
                  res.json().then(response => {
                    this.setState({ character: response.data.character, isLoading: false });
                  });
              } else {
                  res.json().then(() => {
                    this.props.notifHandler(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/characters'); }, 2000);
                  });
              }
          })
    }

    render() {
        return (
            this.state.isLoading ?
            <Loader type="Ball-Triangle" color="black" height="120" />
            :
            <MDBContainer style={{ 'background-color': "white", opacity: "0.9 " }}>
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6">{this.state.character.name}</MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6">
                        {
                            this.state.character.images.map((img, index) => {
                                return (
                                    <Fragment>
                                        <img src={img} alt="" className="img-fluid" key={index} />
                                        <hr />
                                    </Fragment>
                                );
                            })
                        }
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6"><span>{this.state.character.shortStory}</span></MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="3">
                        Race: {this.state.character.race ? this.state.character.race : 'Unknown'}
                    </MDBCol>
                    <MDBCol md="3">
                        Sex: {this.state.character.sex ? this.state.character.sex : 'Unknown'}
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="3">
                        Weapons:
                        {
                            this.state.character.weapons.length > 0 ?
                            this.state.character.weapons.map((weapon, index) => {
                                return (
                                    <div key={index}>
                                        <a href={`/weapon/${weapon._id}`}>{weapon.name}</a>
                                    </div>
                                );
                            })
                            : ' Unknown'
                        }
                    </MDBCol>
                    <MDBCol md="3">
                        Spaceships:
                        {
                            this.state.character.vehicles.length > 0 ?
                            this.state.character.vehicles.map((vehicle, index) => {
                                return (
                                    <div key={index}>
                                        <a href={`/vehicle/${vehicle._id}`}>{vehicle.name}</a>
                                    </div>
                                );
                            })
                            : ' Unknown'
                        }
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="3">
                        Height: {this.state.character.height ? this.state.character.height : 'Unknow'}
                    </MDBCol>
                    <MDBCol md="3">
                        Weight: {this.state.character.weight ? this.state.character.weight : 'Unknown'}
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6">
                        Affilations:
                        {
                            this.state.character.affilations.length > 0 ?
                            this.state.character.affilations.map((affilation, index) => {
                                return (
                                    <div key={index}>{affilation}</div>
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

export default CharacterDetails;
