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
      'get:user:profile:by:id': {
        url: '/api/user/profile/{id}',
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
      'get:question:privacy': {
        url: '/api/question/{id}',
        type: 'get'
      },
      'set:question:privacy': {
        url: '/api/question/{id}/privacy',
        type: 'put'
      },
      'store:testimonial': {
        url: '/api/testimonial',
        type: 'post'
      },
      'store:user:answer': {
        url: '/api/user/answer',
        type: 'post'
      },
      'get:user:answers': {
        url: '/api/user/answer',
        type: 'get'
      },
      'get:user:answer': {
        url: '/api/user/answer/{answer}',
        type: 'get'
      },
      'get:settings:list': {
        url: '/api/user/settings',
        type: 'get'
      },
      'get:settings:by:key': {
        url: '/api/user/settings/key/{key}',
        type: 'get'
      },
      'get:settings:by:section': {
        url: '/api/user/settings/{section}',
        type: 'get'
      },
      'store:settings': {
        url: '/api/user/settings',
        type: 'post'
      },
      'remove:settings': {
        url: '/api/user/settings/{id}',
        type: 'delete'
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
                      <input type="text" name="userId" class="form-control" placeholder="" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get user by id action
                this.state.action === 'get:user:profile:by:id' &&
                <div class="col-md-6 bd-example">
                  <p>Get user public profile info by ID</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:user:profile:by:id'];
                      request(api.url.replace('{id}', e.target.userId.value), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>User ID</label>
                      <input type="text" name="userId" class="form-control" placeholder="" />
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
              { // Get question privacy settings action
                this.state.action === 'get:question:privacy' &&
                <div class="col-md-6 bd-example">
                  <p>Get question privacy settings for current authenticated user</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:question:privacy'];
                      request(api.url.replace('{id}', e.target.questionId.value), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Question ID</label>
                      <input type="number" name="questionId" class="form-control" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Set question privacy settings action
                this.state.action === 'set:question:privacy' &&
                <div class="col-md-6 bd-example">
                  <p>Set question privacy settings for current authenticated user</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['set:question:privacy'];
                      request(api.url.replace('{id}', e.target.questionId.value), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Question ID</label>
                      <input type="number" name="questionId" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label>Question ID</label>
                      <select name="privacy_level" class="form-control">
                        <option value="">--Select privacy level--</option>
                        <option value="1">Show All</option>
                        <option value="2">Show to all my friends</option>
                        <option value="3">Show to selected friends</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Show for users:</label>
                      <div class="form-group">
                        <input type="number" name="privacy_users[]" class="form-control" />
                        <input type="number" name="privacy_users[]" class="form-control" />
                        <input type="number" name="privacy_users[]" class="form-control" />
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get question privacy settings action
                this.state.action === 'store:testimonial' &&
                <div class="col-md-6 bd-example">
                  <p>Add testimonial</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['store:testimonial'];
                      request(api.url, data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Ratio</label>
                      <select name="rate" class="form-control">
                        <option value="">--Ratio--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Message</label>
                      <div class="form-group">
                        <textarea name="message" class="form-control"></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Agree to show this message on a site</label>
                      <div class="form-group">
                        <input type="checkbox" name="user_agreement" value="1" class="formcontrol" />
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get users answers list
                this.state.action === 'get:user:answers' &&
                <div class="col-md-6 bd-example">
                  <p>Get answers list for the authenticated user</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:user:answers'];
                      request(api.url, data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get users answers list
                this.state.action === 'get:user:answer' &&
                <div class="col-md-6 bd-example">
                  <p>Get answer data by ID</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:user:answer'];
                      request(api.url.replace('{answer}', e.target.answerId.value), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Answer ID</label>
                      <input type="number" name="answerId" class="form-control" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get question privacy settings action
                this.state.action === 'store:user:answer' &&
                <div class="col-md-6 bd-example">
                  <p>Add testimonial</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['store:user:answer'];
                      request(api.url, data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Question ID</label>
                      <div class="form-group">
                        <input type="text" name="question_id" class="form-control" placeholder="Question ID" />
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Answer type</label>
                      <select name="answer_type" class="form-control">
                        <option value="">--Answer type--</option>
                        <option value="1">Category</option>
                        <option value="2">Criteria</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Answer value</label>
                      <div class="form-group">
                        <input type="text" name="value" class="form-control" placeholder="Answer" />
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get user settings list
                this.state.action === 'get:settings:list' &&
                <div class="col-md-6 bd-example">
                  <p>Get current authenticated user settings list</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:settings:list'];
                      request(api.url, data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get user settings by setting key
                this.state.action === 'get:settings:by:key' &&
                <div class="col-md-6 bd-example">
                  <p>Get current authenticated user settings by setting alias name</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:settings:by:key'];
                      request(api.url.replace('{key}', e.target.key.value), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Settings key</label>
                      <div class="form-group">
                        <input type="text" name="key" class="form-control" placeholder="Key" />
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get user settings by setting section
                this.state.action === 'get:settings:by:section' &&
                <div class="col-md-6 bd-example">
                  <p>Get current authenticated user settings by setting section (group) name</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['get:settings:by:section'];
                      request(api.url.replace('{section}', e.target.section.value), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Settings section</label>
                      <div class="form-group">
                        <input type="text" name="section" class="form-control" placeholder="Section" />
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Get question privacy settings action
                this.state.action === 'store:settings' &&
                <div class="col-md-6 bd-example">
                  <p>Store setting</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['store:settings'];
                      request(api.url, data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Section</label>
                      <div class="form-group">
                        <input type="text" name="section" class="form-control" placeholder="Section name" />
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Key</label>
                      <div class="form-group">
                        <input type="text" name="key" class="form-control" placeholder="Key" />
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Title</label>
                      <div class="form-group">
                        <input type="text" name="name" class="form-control" placeholder="Title" />
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Value</label>
                      <div class="form-group">
                        <input type="text" name="value" class="form-control" placeholder="" />
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              }
              { // Delete setting
                this.state.action === 'remove:settings' &&
                <div class="col-md-6 bd-example">
                  <p>Delete setting</p>
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      const data = $(e.target).serialize();
                      const api = this.dataMap['remove:settings'];
                      request(api.url.replace('{id}', e.target.settingId.value), data, api.type,
                        (result) => this.setState({ resultJson: result }),
                        (result) => this.setState({ resultJson: result.responseJSON })
                      );
                    }}>
                    <div class="form-group">
                      <label>Setting ID</label>
                      <div class="form-group">
                        <input type="text" name="settingId" class="form-control" placeholder="Setting ID" />
                      </div>
                    </div>
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
