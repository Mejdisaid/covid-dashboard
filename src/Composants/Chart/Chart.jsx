import React from 'react' ; 
import { Line } from 'react-chartjs-2' ;
import styles from './Chart.module.css' ;
//import * as zoom from 'chartjs-plugin-zoom' ; 

const exemple = ( ) => {
    console.log ( 'it works') ; 
}


const Chart  = ( {data:{GlobalData , PaysData} , country, diff }) =>   {
    var text0 = 'total infected' ;
    var text1 = 'active cases'; 
    var text2 = 'recoveries' ; 
    var text3 = 'deaths' ;
    var dateData  =[]  ;
    var totalinfectionData =[] ;
    var infectionData = [] ;  
    var recoveredData = [] ;
    var deathsData = [] ; 
    var infectionDataDiff = [] ; 
    var recoveredDataDiff = [] ; 
    var deathsDataDiff = [] ; 
    exemple() ;
    if (!GlobalData)
        return 'Loading ...';
    //console.log(  GlobalData );
    //console.log(country) ;
    //console.log(diff) ;

    if (( country === '' ) || (country === 'global') ) {
        for ( let i = GlobalData.length-1 ; i > 0 ; i-- ){
            infectionData[GlobalData.length-1 - i ] = GlobalData[i].Infection * GlobalData[i].TauxInfection * 0.01   ; 
            totalinfectionData[GlobalData.length-1 - i ] = GlobalData[i].Infection ;
        }
        for ( let i = GlobalData.length-1 ; i > 0 ; i-- )
            recoveredData[GlobalData.length -1 - i] = GlobalData[i].Guerisons ; 
        for ( let i = GlobalData.length -1 ; i  > 0  ; i-- )
            dateData[GlobalData.length-1 - i] = GlobalData[i].Date ;         // NEED FIXING : Time format !!!!!  
        for ( let i = GlobalData.length -1 ; i  > 0  ; i-- )
            deathsData[GlobalData.length-1 - i] = GlobalData[i].Deces ; 
    }else {
        var j = 0; 
        for ( let i = PaysData.length-1 ; i > 0 ; i-- ){
            if (PaysData[i].Pays === country){
                infectionData[j] = PaysData[i].Infection * PaysData[i].TauxInfection *0.01 ; 
                totalinfectionData[j] = PaysData[i].Infection ;
                console.log(PaysData[i].TauxInfection);
                j = j+1 ; 
            }      
        }
        j=0 ; 
        for ( let i = PaysData.length-1 ; i > 0 ; i-- ){
            if (PaysData[i].Pays === country){
                dateData[j] = PaysData[i].Date ; 
                j = j+1 ; 
            }      
        }
        j=0 ; 
        for ( let i = PaysData.length-1 ; i > 0 ; i-- ){
            if (PaysData[i].Pays === country){
                recoveredData[j] = PaysData[i].Guerisons ; 
                j = j+1 ; 
            }      
        }
        j=0 ; 
        for ( let i = PaysData.length-1 ; i > 0 ; i-- ){
            if (PaysData[i].Pays === country){ 
                deathsData[j] = PaysData[i].Deces ; 
                j = j+1 ; 
            }      
        }
    }

    if (diff === 'diff'){
        text1 = 'new active cases' ; 
        text2 = 'new recoveries' ; 
        text3 = 'new deaths' ;
        infectionDataDiff[0] = infectionData[0] ; 
        recoveredDataDiff[0] = recoveredData[0] ; 
        deathsDataDiff[0]    = deathsData[0] ; 
        for ( let i =1  ; i< infectionData.length ; i++ ){
            infectionDataDiff[i] = infectionData[i] - infectionData[i-1] ; 
        }
        for ( let i =1  ; i< recoveredData.length ; i++ ){
            recoveredDataDiff[i] = recoveredData[i] - recoveredData[i-1] ; 
        }
        for ( let i =1  ; i< deathsData.length ; i++ ){
            deathsDataDiff[i] = deathsData[i] - deathsData[i-1] ; 
        }
        
        infectionData = infectionDataDiff ; 
        recoveredData = recoveredDataDiff ; 
        deathsData    = deathsDataDiff    ;
    }
    
     console.log(infectionData);
     console.log(recoveredData);
     console.log(dateData);


     // FORMAT THE DATE FOR THE CHART 
     for ( let i =0 ; i < dateData.length ; i++ ){
        const d = new Date(dateData[i]) ; 
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        dateData[i] = `${da}-${mo}-${ye}` ;
     }


        return(
            <div className={styles.container}>
                <Line
                    data={
                        {
                            labels : dateData,
                            datasets : [{
                                data : totalinfectionData,
                                label : text0,
                                borderColor : 'gray',
                                fill : 'true',
                            },{
                                data : infectionData,
                                label : text1,
                                borderColor : 'blue',
                                fill : 'true',
                            },{
                                data : recoveredData,
                                label : text2,
                                borderColor : 'green',
                                fill : 'true',
                            },{
                                data : deathsData,
                                label : text3,
                                borderColor : 'red',
                                fill : 'true',
                            }],
                        }

                    }
                />
            </div>
        )

}

export default Chart ;