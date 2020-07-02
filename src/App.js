import React from 'react' ; 

import { Cards , Chart , Departement } from './Composants' ; 
import styles from './App.module.css' ;
import { fetchData } from './api' ;

class App extends React.Component {

    state = {
        data : {},
        country :'',
        diff : 'cumul',
    }

    async componentDidMount() {
        const fetchedData = await fetchData() ;
        console.log(fetchedData) ; 
        this.setState({data: fetchedData})
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country) ;
        this.setState({data: fetchedData , country : country})
    }
    handleTypeChange = async (diff) => {
        const fetchedData = await fetchData(diff) ;
        this.setState({data: fetchedData , diff : diff})
    }

    render() {
        const {data , country , diff} = this.state ;
        return(
            <div className = {styles.container}>
               <Cards data ={data} country={country}  />
               <Departement  handleCountryChange ={this.handleCountryChange} handleTypeChange= {this.handleTypeChange}/> 
               <Chart data ={data} country={country} diff={diff} />
            
          </div> 
        );
    }
}

export default App ;