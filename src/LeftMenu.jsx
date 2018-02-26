import React from 'react';

export default class LeftMenu extends React.Component {

  onMenuClick(action, e) {
    e.preventDefault();
    this.props.onNavigate(action);
  }

  render() {
    return (
      <nav class="bd-links">
        <div class="bd-toc-item active">
          <ul class="nav bd-sidenav">
            <li class="active bd-sidenav-active">
              <a href="#" onClick={this.onMenuClick.bind(this, 'register')}>
                Register
              </a>
            </li>
            <li>
              <a href="#" onClick={this.onMenuClick.bind(this, 'login')}>
                Login
              </a>
            </li>
            <li>
              <span class="nav-section">
                User
              </span>
              <ul class="bd-sidesubnav">
                <li class="active bd-sidenav-active">
                  <a href="#" onClick={this.onMenuClick.bind(this, 'get:authenticated:user')}>
                    Get Authenticated User
                  </a>
                </li>
                <li class="active bd-sidenav-active">
                  <a href="#" onClick={this.onMenuClick.bind(this, 'get:user:by:id')}>
                    Get By ID
                  </a>
                </li>
                <li class="active bd-sidenav-active">
                  <a href="#" onClick={this.onMenuClick.bind(this, 'get:user:profile:by:id')}>
                    Get Public Profile By ID
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'user:update')}>
                    Update
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'user:delete')}>
                    Delete
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <span class="nav-section">
                Podcast
              </span>
              <ul class="bd-sidesubnav">
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'get:podcasts')}>
                    Get Podcasts List
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'get:podcast:by:id')}>
                    Get Podcast By ID
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'get:podcast:categories')}>
                    Get Podcast Categories
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'get:podcast:criterias')}>
                    Get Podcast Criterias
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <span class="nav-section">
                Category
              </span>
              <ul class="bd-sidesubnav">
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'get:category')}>
                    Get Category By ID
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <span class="nav-section">
                FAQ
              </span>
              <ul class="bd-sidesubnav">
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'get:faq:list')}>
                    Get FAQ's List
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <span class="nav-section">
                Question
              </span>
              <ul class="bd-sidesubnav">
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'get:question:privacy')}>
                    Get Privacy Settings
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'set:question:privacy')}>
                    Set Privacy Settings
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <span class="nav-section">
                Testimonials
              </span>
              <ul class="bd-sidesubnav">
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'store:testimonial')}>
                    Store
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <span class="nav-section">
                Answers
              </span>
              <ul class="bd-sidesubnav">
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'get:user:answers')}>
                    Get Answers List
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'get:user:answer')}>
                    Get Answer By ID
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.onMenuClick.bind(this, 'store:user:answer')}>
                    Store
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
