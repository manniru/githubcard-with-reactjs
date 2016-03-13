import '../scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const API = 'https://api.github.com/users';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'hesmaili',
      name:'',
      avatar:'',
      location:'',
      repos:'',
      followers: '',
      following:'',
      homeUrl:'',
      notFound:''
    }
  }
  fetchProfile(username) { 
    let url = `${API}/${username}`;
    fetch(url)
      .then((res) => res.json() )
      .then((data) => {
        this.setState({
          username: data.login,
          name: data.name,
          avatar: data.avatar_url,
          location: data.location,
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          homeUrl: data.html_url,
          notFound: data.message
        })
      })
      .catch((error) => console.log('Oops! . There Is A Problem') )
  }
  componentDidMount() {
    this.fetchProfile(this.state.username);
  }
  render() {
    return (
      <div>
         <section id="card">
           <SearchProfile fetchProfile={this.fetchProfile.bind(this)}/>
           <Profile data={this.state} />
         </section>
          <span className="hesmaili">GitHub Card With ReactJs - Created By <a href="https://twitter.com/hesmaili95" target="_blank" title="Hamed Esmaili">Hamed Esmaili</a></span>
      </div>
    )
  }
}
class SearchProfile extends React.Component {
  render() {
    return (
      <div className="search--box">
         <form onSubmit={this.handleForm.bind(this)}>
           <label><input type="search" ref="username" placeholder="Type Username + Enter"/></label>
         </form>
      </div>
    )
  }
  
  handleForm(e) {
   e.preventDefault();
    let username = this.refs.username.getDOMNode().value
    this.props.fetchProfile(username);
    this.refs.username.getDOMNode().value = '';
  }
}

class Profile extends React.Component {
  render() {
    let data = this.props.data
    if (data.notFound === 'Not Found')
      return (
         <div className="notfound">
            <h2>Oops !!!</h2>
            <p>The Component Couldn't Find The You Were Looking For . Try Again </p>
         </div>
      );
      else
      return (
        <section className="github--profile">
          <div className="github--profile__info">
            <a href={data.homeUrl} target="_blank" title={data.name}><img src={data.avatar} alt={data.username}/></a>
            <h2><a href={data.homeUrl} title={data.username} target="_blank">{data.name}</a></h2>
            <h3>{data.location}</h3>
          </div>
          <div className="github--profile__state">
            <ul>
               <li>
                  <a href="#" title="Number Of Followers"><i>{data.followers}</i><span>Followers</span></a>
               </li>
               <li>
                  <a href="#" title="Number Of Repositoriy"><i>{data.repos}</i><span>Repositoriy</span></a>
               </li>
               <li>
                  <a href="#" title="Number Of Following"><i>{data.following}</i><span>Following</span></a>
               </li>
            </ul>
          </div>
        </section>
      );
  }
}

ReactDOM.render(<App />, document.body);