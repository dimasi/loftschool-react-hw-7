import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {request} from './../../actions/search';
import {getSearchProps} from './../../reducers';
import './Search.css';

class Search extends Component {
  state = {
    query: ''
  }

  handleChange = e => {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = () => {
    const {request} = this.props;
    const {query} = this.state;

    request(query);
  }

  renderLoading = () => {
    const {isFetching} = this.props;

    if (isFetching) {
      return (
        <div className="Search__loading">Загрузка...</div>
      );
    }
  }
  
  renderResults = () => {
    const {entities} = this.props;

    return entities.map(entity => this.renderItem(entity));
  }

  renderItem = entity => {
    const {
      id, 
      image, 
      name, 
      type, 
      language, 
      genres, 
      premiered, 
      status, 
      rating: {average: rating}, 
      summary
    } = entity;

    return (
      <section 
        className="Search__item" 
        key={id}
      >
        <div className="Search__item-img-container">
          <Link 
            to={`/shows/${id}`}
            className="Search__item-img-link"
          >
            {this.renderItemImage(image)}
          </Link>
        </div>
        <div className="Search__item-info">
          <h4 className="Search__item-name">
            <Link 
              to={`/shows/${id}`}
              className="Search__item-name-link"
            >
              {name}
            </Link>
          </h4>
          <table className="Search__item-data">
            <tbody>
              <tr>
                <th>Type:</th>
                <td>{type}</td>
                <th>Language:</th>
                <td>{language || 'n/a'}</td>
              </tr>
              <tr>
                <th>Genres:</th>
                <td>{genres.join(', ') || 'n/a'}</td>
                <th>Premiered:</th>
                <td>{premiered || 'n/a'}</td>
              </tr>
              <tr>
                <th>Status:</th>
                <td>{status}</td>
                <th>Rating:</th>
                <td>{rating || 'n/a'}</td>
              </tr>
            </tbody>
          </table>
          <div 
            className="Search__item-description" 
            dangerouslySetInnerHTML={{__html: summary}} 
          />
        </div>
      </section>
    );
  }

  renderItemImage = image => {
    if (image) {
      return (
        <img 
          className="Search__item-img"
          alt="" 
          src={image.medium} 
        />
      );
    }
    else {
      return (
        <span className="Search__item-no-img">No cover</span>
      );
    }
  }

  render() {
    const {query} = this.state;

    return (
      <div className="Search">
        <div className="Search__control-wrapper">
          <input 
            className="Search__control App__textfield"
            placeholder="Type the name..."
            name="query"
            value={query}
            onChange={this.handleChange}
          />
          <button 
            className="Search__submit App__button"
            type="button"
            onClick={this.handleSubmit}
          >
            Search
          </button>
        </div>
        {this.renderLoading()}
        {this.renderResults()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...getSearchProps(state)
});

const mapDispatchToProps = {
  request
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
