import React from 'react' ; 
import { Cards , ModelInput , Chart , Departement , ModelChart } from './Composants' ; 
import styles from './App.module.css' ;
import { fetchData } from './api' ;

class App extends React.Component {


    state = {
        data : {},
        country :'global',
        diff : 'cumul',
        //Model SIR Parameters
        N  : 12000000, 
        s0 : 12000000,
        e0 : 1 , 
        i0 : 1 ,
        r0 : 0 ,  
        a  : 0.3 , 
        b  : 0.2 ,
        c  : 0.1 , 
        f  : 0.15 ,
        choice : "def"
    }

    async componentDidMount() {
        console.log("ComponentDidMount") ;
        const fetchedData = await fetchData() ;
        console.log(fetchedData) ;
        this.setState({data: fetchedData});
        console.log("*****") ;
 
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData() ;
        this.setState({data: fetchedData , country : country}) ;
        console.log("handleCountryChange") ;
    }
    handleTypeChange = async (diff) => {
        const fetchedData = await fetchData() ;
        this.setState({data: fetchedData , diff : diff})
        console.log("handleTypeChange") ;
    }
   
/*    handlePopChange = async (N) => {
        const fetchedData = await fetchData() ;
        this.setState({data: fetchedData , N : N})
    }
    handleS0Change = async (s0) => {
        const fetchedData = await fetchData() ;
        this.setState({data: fetchedData , s0 : s0})
    }
    handleI0Change = async (i0) => {
        const fetchedData = await fetchData() ;
        this.setState({data: fetchedData , i0 : i0})
    }
    handleR0Change = async (r0) => {
        const fetchedData = await fetchData() ;
        this.setState({data: fetchedData , r0 : r0})
    }*/

    handleInputChange = async (N,s0,e0, i0,r0 , a,b,c ,f , choice) => {
        const fetchedData = await fetchData() ;
        this.setState({data: fetchedData , N : N , s0 : s0,e0 : e0 ,  i0 : i0 , r0:r0,  a:a ,  b:b , c:c ,f:f ,choice:choice })
        console.log("handleInputChange") ;
    }
    render() {
        const {data , country , diff , N , s0 ,e0, i0 ,  r0, a , b ,c , f,choice} = this.state ;

        return(
            <div className = {styles.container}>
                <Cards data ={data} country={country}  />
                <Departement  handleCountryChange ={this.handleCountryChange} handleTypeChange= {this.handleTypeChange}/> 
                <Chart data ={data} country={country} diff={diff}   />
                <ModelInput handleInputChange={this.handleInputChange}  N = {N} s0 = {s0} e0={e0} i0={i0} r0={r0} a={a} b={b} c={c} f={f} />  
                <ModelChart  data ={data} country={country} N = {N} s0 = {s0}  e0={e0} i0={i0} r0={r0} a={a} b={b} c={c} f={f} choice={choice}  />        
            </div> 
        );
    }
}

export default App ;