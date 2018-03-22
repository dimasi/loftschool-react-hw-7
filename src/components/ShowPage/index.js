import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {request} from './../../actions/shows';
import {getShowProps} from './../../reducers';
import './ShowPage.css';

class ShowPage extends PureComponent {
  componentDidMount() {
    const {request, match} = this.props;
    const {id: showId} = match.params;

    request(showId);
  }

  renderLoading = () => {
    const {isFetching} = this.props;

    if (isFetching) {
      return (
        <div className="Search__loading">Загрузка...</div>
      );
    }
  }

  renderContent = entity => {
    const {
      name, 
      image, 
      summary, 
      _embedded: {cast: actors}
    } = entity;

    return (
      <div className="ShowPage__content">
        <h1 className="ShowPage__heading">{name}</h1>
        {this.renderCover(image)}
        <div 
          className="ShowPage__description" 
          dangerouslySetInnerHTML={{__html: summary}} 
        />
        {this.renderActors(actors)}
      </div>
    );
  }

  renderCover = image => {
    if (image) {
      return (
        <img 
          className="ShowPage__cover"
          alt="" 
          src={image.original} 
        />
      );
    }
    else {
      return (
        <span className="ShowPage__no-cover">No cover</span>
      );
    }
  }
  
  renderActors = actors => {
    if (actors.length) {
      return (
        <section className="ShowPage__actors">
          <header className="ShowPage__actors-header">
            <h3 className="ShowPage__actors-heading">Actors</h3>
          </header>
          <div className="ShowPage__actors-grid">
            {actors.map(actor => this.renderActor(actor))}
          </div>
        </section>
      );
    }
  }
  
  renderActor = actor => {
    const {
      person: {id: personId, name, image}, 
      character: {id: characterId, name: role}
    } = actor;
    const key = `${personId}${characterId}`;

    return (
      <section 
        className="ShowPage__actor" 
        key={key}
      >
        {this.renderActorPhoto(image)}
        <h4 className="ShowPage__actor-name">{name}</h4>
        <span className="ShowPage__actor-role">({role})</span>
      </section>
    );
  }
  
  renderActorPhoto = image => {
    if (image) {
      return (
        <img 
          className="ShowPage__actor-photo" 
          alt=""
          src={image.medium}
        />
      );
    }
    else {
      return (
        <span className="ShowPage__actor-no-photo">No photo</span>
      );
    }
  }

  render() {
    const {entities, isFetching} = this.props;
    const entity = entities[0];

    return (
      <div className="ShowPage">
        {
          entity && !isFetching ?
          this.renderContent(entity) : 
          this.renderLoading()
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {entities, isFetching} = getShowProps(state);

  return {
    entities,
    isFetching 
  };
};

const mapDispatchToProps = {
  request
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);
