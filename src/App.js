import './App.css';
import {useState} from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Rate } from 'antd';
import { Films } from './Films';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


function App() {
  const [series, setseries] = useState(Films);
  const [rateValue, setRateValue] = useState(5);
  const [inputFilter, setInputFilter] = useState('');
  const filterHandler = (searchTerm) => {
    setInputFilter(searchTerm);
  }
  return (
    <div className="App">
    <Router>
      <Filter ratevalue={rateValue} setratevalue={setRateValue} searching={filterHandler}/>
      <Switch>
      <Route
          path="/series/:id"
          component={(props) => <Trailer {...props} serieslist={series} />}
        />
        
      </Switch>
      <MovieList serieslist={series.filter(el => el.rate <= rateValue && el.title.toLocaleLowerCase().includes(inputFilter.toLocaleLowerCase()))} setseries={setseries} />
    
    </Router>

    
    </div>
  );
}


const MovieCard = (props) => {
  const { item } = props
  return( <>
  <Link to={`/series/${item.title}`}>
    <div className='series'>
      <img src={item.posterUrl} alt={item.title} style={{height:'35em', width:'100%'}}></img>
      <div className='series-info'>
          <h2>{item.title}</h2>
          <Rate disabled value={parseInt(item.rate)} style={{fontSize: 25}}/>
      </div>
      <div className='series-description'>
          <h2>Description :</h2>
          <p>{item.description}</p>
      </div>
    </div>
  </Link>
  </>
  )
}
const MovieList = (props) => {
  const {serieslist, setseries} = props
  const handleOk = (addTerm) => {
    setseries([...serieslist, addTerm]);
  };
  return( <div>
            <AddMovie onOk={handleOk}/>
            <div className='series-container'>
                {serieslist.map((el,i) => (
                    <MovieCard key={i} item={el}/>
                ))}
            </div>
        </div>)
}
const AddMovie = (props) => {
      //React Hooks
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [modalInputTitle, setModalInputTitle] = useState('');
      const [modalInputPoster, setModalInputPoster] = useState('');
      const [modalInputTrailer, setModalInputTrailer] = useState('');
      const [modalInputRating, setModalInputRating] = useState('');
      const [modalInputDescription, setModalInputDescription] = useState('');
      //Modal Show On/Off
      const showModal = () => {
          setIsModalVisible(true);
      };
      const handleOk = () => {
          props.onOk({title : modalInputTitle,posterUrl : modalInputPoster, trailer : modalInputTrailer, rate : modalInputRating, description : modalInputDescription});
          setIsModalVisible(false);
      };
      const handleCancel = () => {
          setIsModalVisible(false);
      };
  
      //Get Films from modal and passed to MovieList as a callback function
      const modalTitleHandler = e => {
          setModalInputTitle(e.target.value)
      };
      const modalPosterHandler = e => {
          setModalInputPoster(e.target.value)
      };
      const modalTrailerHandler = e => {
        setModalInputTrailer(e.target.value)
      }
      const modalRatingHandler = e => {
          setModalInputRating(e.target.value)
      };
      const modalDescriptionHandler = e => {
          setModalInputDescription(e.target.value)
      }
  return(<>
    <Button className='addBtn' type="danger" onClick={showModal} >
        Add New Serie
    </Button>
    <Modal title="Add series" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className='pop-up-modal'>
        <label>Title :</label>
        <br></br>
        <input type='text' 
            placeholder="series title..."
            value={modalInputTitle}
            onChange={modalTitleHandler}>
        </input>
        <br></br>
        <label>Poster :</label>
        <br></br>
        <input type='text' 
            placeholder="add a valid url link..."
            value={modalInputPoster}
            onChange={modalPosterHandler}>
        </input>
        <br></br>
        <label>Trailer :</label>
        <br></br>
        <input type='text' 
            placeholder="add a valid url link..."
            value={modalInputTrailer}
            onChange={modalTrailerHandler}>
        </input>
        <br></br>
        <label>Rating :</label>
        <br></br>
        <input type='number' 
            placeholder="add a rating from 0 to 5..."
            value={modalInputRating}
            onChange={modalRatingHandler}>
        </input>
        <br></br>
        <label>Description :</label>
        <br></br>
        <textarea type='text'
            placeholder='add your description'
            value={modalInputDescription}
            onChange={modalDescriptionHandler}
            cols='35'
            rows='8'>
        </textarea>
    </Modal>
</>)
}
const Filter = (props) => {
  const { ratevalue, setratevalue, searching } = props
  const ratingSetValueHandler = (nextValue) => {
    setratevalue(nextValue);
  }
  return(
  <div className='header' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' , backgroundColor: 'black', padding: '1rem', marginBottom: '1rem',}}>
    <div>
      <h1 style={{color: 'red', margin:'1em'}}>Watch SERIES</h1>
    </div>
    <div>
      <input type='text' 
      onChange={e =>searching(e.target.value)}
      placeholder='Search Series'></input>
      <br></br>
      <div style={{color:'white', fontSize:'1.5em'}}>
      Filter : <Rate style={{fontSize : 30}}
      value={ratevalue}
      onChange={ratingSetValueHandler}
      allowClear={false}/>
      </div>
    </div>
  </div>
  )
}
const Trailer = (props) => {
  const {serieslist,match} = props
  let series = serieslist.find(el => el.title === match.params.id);
  let descriptionFilms;
  let trailerFilms;
  if(series)
      descriptionFilms = <><p>{series.description}</p></>
      trailerFilms = <><iframe title={series.title} width="560" height="315" src={series.trailer} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></>
  return (
      <div className='series-page' style={{textAlign:'center'}}>
          <Link to='/'>
              <Button style={{marginBottom:20,width:200, height:50, color:'black', fontSize: 16, fontWeight:'600'}}>Close Trailer Page</Button>
          </Link>
          <div style={{color:'white', fontSize:20, fontWeight:'600', borderRadius:'4px solid black'}}>
              {trailerFilms}
              <br></br>
              <h1>Description :</h1>
              {descriptionFilms}
          </div>
      </div>
  )
}

export default App;
