import './App.css';
import { useState, useEffect } from 'react'; //hook called useState hook , useEffect hook runs when website is immediately loaded
import Axios from 'axios'; //helps with api requests without fetch

function App() {
  const [listOfUsers, setListOfUsers] = useState([]); //create a state which is going to be a list, initial var will be an empty array
  const [name, setName] = useState(''); //when there are changes in input, we need to detect that by using state
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => { //would need to change localhost if its online, getUsers is the endpoint of our request
    Axios.get('http://localhost:3001/getUsers').then((response) => { //get request
      setListOfUsers(response.data); //uses state to fill listofusers
    })
  }, []);

  const createUser = () => { //function when button is clicked
    Axios.post('http://localhost:3001/createUser', {
      name: name,
      age: age,
      username: username,
    //for post request, remember assumption that body will be used to send data
    //but currently we are not getting that information from those inputs(this was changed read below)
    //name and age and username are no longer empty strings, but the state
    //we need a state to hold input information
    }).then((response) => { 
      alert('User Created');
      setListOfUsers([...listOfUsers, {name,age,username}]) //updates currentDOM
    })
  };


  return (
    <div className="App">
      <div className='usersDisplay'>
          {listOfUsers.map((user)=> { //for each user
            return <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
            </div>
          })}
      </div>

      <div>
          <input 
            type='text' 
            placeholder='Name...' 
            onChange={(event) => {
              setName(event.target.value)
              }}  /*any change, we can call function, grab value of input, and set the state to be the input value */
          />
          <input 
            type='number' 
            placeholder='Age...'
            onChange={(event) => {
              setAge(event.target.value)
              }}
          />
          <input 
            type='text' 
            placeholder='Username...'
            onChange={(event)=> {
              setUsername(event.target.value)
              }}
            />
          <button onClick={createUser}>Create User</button>
      </div>

    </div>
  );
}

export default App;
