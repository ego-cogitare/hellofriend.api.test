import React from 'react';
import classNames from 'classnames';
import LeftMenu from './LeftMenu.jsx';
import ReactJson from 'react-json-view';
import { request } from './Request.js';

export default class Client extends React.Component {

  constructor(props) {
    super(props);

    this.dataMap = {
      register: {
        url: '/api/auth/registration',
        type: 'post'
      },
      login: {
        url: '/api/auth/login',
        type: 'post'
      },
      'get:authenticated:user': {
        url: '/api/auth/user',
        type: 'get'
      },
      'get:user:by:id': {
        url: '/api/auth/user/{user}',
        type: 'get'
      },
      'user:update': {
        url: '/api/auth/user/{user}',
        type: 'put'
      },
      'user:delete': {
        url: '/api/auth/user/{user}',
        type: 'delete'
      },
      'get:category': {
        url: '/api/category/{id}',
        type: 'get'
      },
      'get:podcasts': {
        url: '/api/podcast',
        type: 'get'
      },
      'get:podcast:by:id': {
        url: '/api/podcast/{id}',
        type: 'get'
      },
      'get:podcast:categories': {
        url: '/api/podcast/{id}/categories',
        type: 'get'
      },
      'get:podcast:criterias': {
        url: '/api/podcast/{id}/criterias',
        type: 'get'
      },
      'get:faq:list': {
        url: '/api/faq',
        type: 'get'
      },
    };

    this.state = {
      action: '',
      resultJson: '',
      user: JSON.parse(localStorage.getItem('user')),
      token: localStorage.getItem('token'),
    };
  }

  onMenuNavigate(action) {
    this.setState({ action, resultJson: '' });
  }

  render() {
    return (
      <div>
        <header class="navbar navbar-expand navbar-dark flex-column flex-md-row" style={{backgroundColor:'#563d7c'}}>
          <div class="navbar-nav-scroll">
            HelloFriend API test
          </div>
        </header>
        <div class="container-fluid">
          <div class="row flex-xl-nowrap">
            <div class="col-12 col-md-2 col-xl-2 bd-sidebar">
              <LeftMenu onNavigate={this.onMenuNavigate.bind(this)} />
            </div>
            <div class="col-12 col-md-10 col-xl-8 py-md-3 pl-md-5 bd-content">
              { // Register action
                this.state.action === 'register' &&
                <div class="col-md-6 bd-example">
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['register'];
                      request(api.url, data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                      <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input type="text" name="password" class="form-control" placeholder="Password" />
                    </div>
                    <div class="form-group">
                      <label>First Name</label>
                      <input type="text" name="first_name" class="form-control" placeholder="First Name" />
                    </div>
                    <div class="form-group">
                      <label>Last Name</label>
                      <input type="text" name="last_name" class="form-control" placeholder="Last Name" />
                    </div>
                    <div class="form-group">
                      <label>Podcast</label>
                      <select name="podcast_id" class="form-control">
                        <option value="">--Select podcast--</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Password Hint</label>
                      <input type="text" name="password_hint" class="form-control" placeholder="Password Hint" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Login action
                this.state.action === 'login' &&
                <div class="col-md-6 bd-example">
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['login'];
                      request(api.url, data, api.type,
                        (result) => this.setState({ resultJson: result }, () => {
                          localStorage.setItem('token', result.token);
                          localStorage.setItem('user', JSON.stringify(result.user));
                        }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" name="email" class="form-control" placeholder="Enter email" />
                      <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input type="text" name="password" class="form-control" placeholder="Password" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Login action
                this.state.action === 'get:authenticated:user' &&
                <div class="col-md-6 bd-example">
                  <p>Get current authenticated user</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:authenticated:user'];
                      request(api.url, data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get user by id action
                this.state.action === 'get:user:by:id' &&
                <div class="col-md-6 bd-example">
                  <p>Get user info by ID</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:user:by:id'];
                      request(api.url.replace('{user}', e.target.userId.value), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>User ID</label>
                      <input type="text" name="userId" class="form-control" placeholder="Password" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Update user action
                this.state.action === 'user:update' &&
                <div class="col-md-6 bd-example">
                  <p>Update user basic information</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['user:update'];
                      const user = JSON.parse(localStorage.getItem('user'));
                      request(api.url.replace('{user}', user.id), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>First Name</label>
                      <input type="text" name="first_name" class="form-control" placeholder="First Name" defaultValue={this.state.user.first_name} />
                    </div>
                    <div class="form-group">
                      <label>Last Name</label>
                      <input type="text" name="last_name" class="form-control" placeholder="Last Name" defaultValue={this.state.user.last_name} />
                    </div>
                    <div class="form-group">
                      <label>Password Hint</label>
                      <input type="text" name="password_hint" class="form-control" placeholder="Password Hint" defaultValue={this.state.user.password_hint} />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Delete user action
                this.state.action === 'user:delete' &&
                <div class="col-md-6 bd-example">
                  <p>Delete current user</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['user:delete'];
                      const user = JSON.parse(localStorage.getItem('user'));
                      request(api.url.replace('{user}', user.id), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get category action
                this.state.action === 'get:category' &&
                <div class="col-md-6 bd-example">
                  <p>Get category data</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:category'];
                      request(api.url.replace('{id}', e.target.categoryId.value), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Category ID</label>
                      <input type="number" name="categoryId" class="form-control" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get podcasts list action
                this.state.action === 'get:podcasts' &&
                <div class="col-md-6 bd-example">
                  <p>Get list of podcasts</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:podcasts'];
                      request(api.url, data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get podcasts list action
                this.state.action === 'get:podcast:by:id' &&
                <div class="col-md-6 bd-example">
                  <p>Get podcast By ID</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:podcast:by:id'];
                      request(api.url.replace('{id}', e.target.podcastId.value), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Podcast ID</label>
                      <input type="number" name="podcastId" class="form-control" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get podcast categories action
                this.state.action === 'get:podcast:categories' &&
                <div class="col-md-6 bd-example">
                  <p>Get podcast categories list</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:podcast:categories'];
                      request(api.url.replace('{id}', e.target.podcastId.value), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Podcast ID</label>
                      <input type="number" name="podcastId" class="form-control" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get podcast categories action
                this.state.action === 'get:podcast:criterias' &&
                <div class="col-md-6 bd-example">
                  <p>Get podcast criterias list</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:podcast:criterias'];
                      request(api.url.replace('{id}', e.target.podcastId.value), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Podcast ID</label>
                      <input type="number" name="podcastId" class="form-control" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get FAQ's list action
                this.state.action === 'get:faq:list' &&
                <div class="col-md-6 bd-example">
                  <p>Get FAQ's list</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:faq:list'];
                      request(api.url, data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Show json result
                this.state.resultJson &&
                <div class="result col-md-6">
                  <ReactJson src={this.state.resultJson} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
