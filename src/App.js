
import './App.css';
import { useState, useEffect, } from 'react'
import AppBar from '@mui/material/AppBar';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function App() {
  return (
    <div>
      <AppBar position="static" className="Menu_item">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li><Link to="/create-user">Create User</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </AppBar>
      {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/">
          dashboard
        </Route>
        <Route path="/users" element={<UserList />}>
          users
        </Route>
        <Route path="/create-user" element={<CreateUser />}>

        </Route>
        <Route path="users/edit-user/:id" element={<EditUser />}>
          Edituser
        </Route>
        <Route path="users/profile/:id" element={<Profile />}>
        </Route>
        <Route path="/edit-profile/:id" element={<Editprofile />}>
          Edituser
        </Route>
        <Route path="/about">
          about
        </Route>
      </Routes>
    </div>
  );
}

export default App;

function CreateUser() {
  return (
    // <div className="add_movie_container">
    //   <TextField id="outlined-basic" label="Enter User Name" variant="outlined" onChange={event =>setUsername(event.target.value)} />
    //   <TextField id="outlined-basic" label="Paste Movie Image URL" variant="outlined" margin="normal" onChange={event => setUserImage(event.target.value)} />
    //   <TextField id="outlined-basic" label="Enter Movie Description" variant="outlined" margin="normal" onChange={event => setUsernumber(event.target.value)} />
    //   <TextField id="outlined-basic" label="Enter Movie Trailer" variant="outlined" margin="normal" onChange={event => setUseremail(event.target.value)} />
    //   <Button variant="contained" size="large" onClick={() => {
    //     addMovie();
    //   }}>Add Movie</Button>
    // </div>
    <div className="add_user_form">
      <div className="add_user_container">
        <TextField id="outlined-basic" label="Enter User Name" variant="outlined" />
        <TextField id="outlined-basic" label="Paste User Image URL" variant="outlined" margin="normal" />
        <TextField id="outlined-basic" label="Enter Phone Number" variant="outlined" margin="normal" />
        <TextField id="outlined-basic" label="Enter Email Address" variant="outlined" margin="normal" />
        <TextField id="outlined-basic" label="Enter Street Address" variant="outlined" margin="normal" />
        <TextField id="outlined-basic" label="Enter City" variant="outlined" margin="normal" />
        <TextField id="outlined-basic" label="Enter Country" variant="outlined" margin="normal" />
        <Button variant="contained" size="large">Add User</Button>
      </div>
    </div>

  );
}

function UserList() {
  const [user, setUser] = useState([]);

  const getUser = () => {
    fetch("https://6173de34110a740017223187.mockapi.io/users")
      .then(data => data.json())
      .then(user => setUser(user))
  };

  useEffect(getUser, [])

  return (
    <div className="user-list-container">
      {user.map((e, index) => <User name={e.name} avatar={e.avatar} key={index} id={e.id} />)}
    </div>
  );
}

function User({ name, avatar, id }) {
  const navigate = useNavigate();
  return (
    <Card style={{ marginTop: "20px", marginLeft: "20px" }}>
      <div className="user-container">
        {/* <img src={avatar} alt={name} className="user_image"></img> */}
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={<IconButton><EditIcon style={{ backgroundColor: "white", borderRadius: "50%" }} onClick={() => navigate("edit-user/" + id)} color="primary" /></IconButton>}
        >
          <Avatar alt={name} src={avatar} style={{ height: "6rem", width: "6rem" }} />
        </Badge>

        <h1 style={{ fontSize: "2rem" }}>{name}</h1>
        <IconButton>
          <InfoIcon style={{ fontSize: "4rem" }} color="primary" onClick={() => navigate("profile/" + id)} />
        </IconButton>
      </div>
    </Card>

  )
}

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserdetails] = useState([]);
  const getUser = () => {
    fetch("https://6173de34110a740017223187.mockapi.io/users/" + id)
      .then(data => data.json())
      .then(user => setUserdetails(user))
  };
  useEffect(getUser, [id])
  return (
    <div className="profile_container">
      <div class="con1">
        <div class="hcard">
          <img class="pimg" alt={userDetails.name} src={userDetails.avatar} />
        </div>
        <div className="basic_Deatils_Container">
          <h1>{userDetails.name}<IconButton><EditIcon onClick={() => navigate("/edit-profile/" + id)} /></IconButton></h1>
          <p>{userDetails.number}</p>
          <p>{userDetails.email}</p>
        </div>
        <div className="AddressDetails">
          <p>{userDetails.street},</p>
          <p>{userDetails.city},</p>
          <p>{userDetails.country}.</p>
        </div>
      </div>
    </div>

  )
}

function EditUser(){
  const { id } = useParams();


  const [name, setUsername] = useState("");
  const [image, setUserImage] = useState("")
  const [number, setUsernumber] = useState("");
  const [email, setUseremail] = useState("");
  const [street, setStreet] = useState("");
  const [city,setCity] = useState("");
  const [country, setCountry] = useState("")

  const getUser = () => {
    fetch("https://6173de34110a740017223187.mockapi.io/users/" + id)
      .then(data => data.json())
      .then(user => {
        setUsername(user.name)
        setUserImage(user.avatar)
        setUsernumber(user.number)
        setUseremail(user.email)
        setStreet(user.street)
        setCity(user.city)
        setCountry(user.country)
      });
  };
  useEffect(getUser,[id]);
  return(
    <div className="add_user_form">
      <div className="add_user_container">
        <TextField id="outlined-basic" label="Enter User Name" value={name} variant="outlined"  />
        <TextField id="outlined-basic" label="Paste User Image URL" value={image} variant="outlined"  margin="normal" />
        <TextField id="outlined-basic" label="Enter Phone Number" value={number} variant="outlined" margin="normal" />
        <TextField id="outlined-basic" label="Enter Email Address" value={email} variant="outlined" margin="normal" />
        <TextField id="outlined-basic" label="Enter Street Address" value={street} variant="outlined" margin="normal" />
        <TextField id="outlined-basic" label="Enter City" variant="outlined" value={city} margin="normal" />
        <TextField id="outlined-basic" label="Enter Country" variant="outlined" value={country} margin="normal" />
        <Button variant="contained" size="large">Update User</Button>
      </div>
    </div>
  )
}

function Editprofile(){
  const { id } = useParams();


  const [name, setUsername] = useState("");
  const [image, setUserImage] = useState("")
  const [number, setUsernumber] = useState("");
  const [email, setUseremail] = useState("");
  const [street, setStreet] = useState("");
  const [city,setCity] = useState("");
  const [country, setCountry] = useState("")

  const getUser = () => {
    fetch("https://6173de34110a740017223187.mockapi.io/users/" + id)
      .then(data => data.json())
      .then(user => {
        setUsername(user.name)
        setUserImage(user.avatar)
        setUsernumber(user.number)
        setUseremail(user.email)
        setStreet(user.street)
        setCity(user.city)
        setCountry(user.country)
      });
  };
  
  useEffect(getUser,[id]);
  return(
    <div className="add_user_form">
      <div className="add_user_container">
        <TextField id="outlined-basic" label="Enter User Name" value={name} variant="outlined"   />
        <TextField id="outlined-basic" label="Paste User Image URL" value={image} variant="outlined"  margin="normal" />
        <TextField id="outlined-basic" label="Enter Phone Number" value={number} variant="outlined" margin="normal" />
        <TextField id="outlined-basic" label="Enter Email Address" value={email} variant="outlined" margin="normal" />
        <TextField id="outlined-basic" label="Enter Street Address" value={street} variant="outlined" margin="normal" />
        <TextField id="outlined-basic" label="Enter City" variant="outlined" value={city} margin="normal" />
        <TextField id="outlined-basic" label="Enter Country" variant="outlined" value={country} margin="normal" />
        <Button variant="contained" size="large">Update Pofile</Button>
      </div>
    </div>
  )

}