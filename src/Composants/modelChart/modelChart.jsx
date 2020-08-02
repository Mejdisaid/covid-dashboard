import React from 'react' ; 
import { Line } from 'react-chartjs-2' ;
import styles from './ModelChart.module.css' ;

//import * as zoom from 'chartjs-plugin-zoom' ; 





const ModelChart  = ( { data:{GlobalData , PaysData} ,country, N,s0,e0,i0,r0,a,b,c,f,choice }) =>   {
    var susceptibles = []; 
    var infected     = [];
    var exposed      = [];  
    var recovered    = []; 
    var dateData     = [];
    var parameters   = []; 
    var Choice = choice ; 
    var text1 = "", text2 ="" , text3="" , text4="" ;

    parameters[0] = parseFloat(a) ; 
    parameters[1] =parseFloat(b) ;
    parameters[2] =parseFloat(c) ;
    parameters[3] =parseFloat(f) ;

    var realRecoveries = [] ; 
    if (!GlobalData)
        return 'Loading ...';
    //console.log(N)  ;
    
    //console.log(i0) ;
    //console.log(s0) ;
    //console.log(r0) ;
    
    susceptibles[0] = s0 ;     // fraction of the susceptible individuals
    exposed[0] = e0 ; 
    infected[0] = i0   ;     // fraction of the infected population
    recovered[0] = r0 ;      // fraction of the recovered population
    var j =0  ; 
    if (country === "global"){
        for ( let i = GlobalData.length-1 ; i > 0 ; i-- )
        realRecoveries[GlobalData.length -1 - i] = GlobalData[i].Guerisons ; 
    }
    else
        for ( let i = PaysData.length-1 ; i > 0 ; i-- ){
            if (PaysData[i].Pays === country){
                realRecoveries[j] = PaysData[i].Guerisons ; 
                j = j+1 ; 
               // console.log("j" + j ) ;
                
            }      
        }

    remplissage(GlobalData,susceptibles ,exposed, infected , recovered , parameters , N )  ;
    //console.log("EQM" + EQM(realRecoveries,recovered)) ; 

    for ( let i = GlobalData.length -1 ; i  > 0  ; i-- )
        dateData[GlobalData.length-1 - i] = GlobalData[i].Date ; 
    
    for ( let i =0 ; i < dateData.length ; i++ ){
        const d = new Date(dateData[i]) ; 
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        dateData[i] = `${da}-${mo}-${ye}` ;
    }
   // console.log ( "apres remplissage " + recovered) ; 
    //console.log("parametres" + parameters + "N : "+ N) ; 
    if (Choice === "opt"){
        solution(GlobalData,realRecoveries , susceptibles ,exposed, infected , recovered, parameters,N) ; 
        text1 =parameters[0] ; 
        text2 =parameters[1] ; 
        text3 =parameters[2] ;
        text4 =parameters[3] ;
    }
    else
        {
            text1="" ;
            text2="";
            text3="";
            text4="";
        }

    console.log("apres solution param " + parameters)  ;
    console.log("apres solution dir" + direction(GlobalData,realRecoveries , susceptibles ,exposed, infected , recovered, parameters,N))  ;
    console.log("apres solution param " + parameters)  ;
    console.log ( "apres solution eqm" +  EQM(realRecoveries, recovered)) ; 
    return( 
        <div className={styles.container}>
            <Line
                data={
                    {
                        labels : dateData,
                        datasets : [{
                            data : susceptibles,
                            label : "Susceptibles",
                            borderColor : 'gray',
                            fill : 'true',
                        },{
                            data : exposed,
                            label : "exposed",
                            borderColor : 'orange ',
                            fill : 'true',
                        },{
                            data : infected,
                            label : "active cases",
                            borderColor : 'blue ',
                            fill : 'true',
                        },{
                            data : recovered,
                            label : "recovered",
                            borderColor : 'green',
                            fill : 'true',
                        }],
                    }

                }
            />
        <p> Solution Optimale : a= {text1}        ,    b= {text2}     ,     c= {text3}     ,     f= {text4} </p>
        </div>
    )

}

export default ModelChart ;


const remplissage = (GlobalData, susceptibles ,exposed, infected , recovered, parameters,N ) => {
    for ( let i =0 ; i < GlobalData.length -1 ; i++  ){
        susceptibles[i+1] = (1 - (parameters[0]/N) * infected[i] ) * susceptibles[i]  ; 
        exposed[i+1] = (parameters[0]/N) * infected[i]* susceptibles[i] + (1-parameters[1]) * exposed[i] ; 
        infected[i+1] = parameters[1] * exposed[i]  + (1-parameters[2]) * infected[i] ;  
        recovered[i+1] = recovered[i] +parameters[3] *parameters[2]* infected[i] ; 
    }
    if ( parameters[0] === NaN)
        console.log("remplissage");

    
}

const EQM = (array1 , array2 ) =>{
    var result = 0  ; 
    for ( let i =0 ; i < array1.length ; i ++ ){
        result  = result + Math.pow((array1[i] - array2[i]), 2); 
    }
    result = result / array1.length ;  

    return result
}


const direction= (GlobalData,realRecoveries , susceptibles ,exposed, infected , recovered, parameters,N)=>{
    var e1,e2,e3,e4,e5,e6,e7,e8  ; 
    let pas = 0.001 ; 
    console.log("param " + parameters[0])  ;
    parameters[0]= parameters[0] + pas ; 
    remplissage(GlobalData, susceptibles ,exposed, infected , recovered,parameters,N);
    e1 = EQM(realRecoveries, recovered) ;
    console.log("param " + parameters[0])  ;
    parameters[0]= parameters[0]-pas ; 
    parameters[1]= parameters[1]+pas ; 
    remplissage(GlobalData, susceptibles ,exposed, infected , recovered, parameters,N);
    e2 = EQM(realRecoveries, recovered) ;
    console.log("param " + EQM(realRecoveries, recovered))  ;
    parameters[1]= parameters[1]-pas ; 
    parameters[2]= parameters[2]+pas ; 
    remplissage(GlobalData, susceptibles ,exposed, infected , recovered, parameters,N);
    e3 = EQM(realRecoveries, recovered) ;
    console.log("param " + parameters[0])  ;
    parameters[2]= parameters[2]-pas ; 
    parameters[3]= parameters[3]+pas ; 
    remplissage(GlobalData, susceptibles ,exposed, infected , recovered, parameters,N);
    e4 = EQM(realRecoveries, recovered) ;
    console.log("param " + parameters[0])  ;
    parameters[3]= parameters[3]-pas ; 
    parameters[0]= parameters[0]-pas ; 
    remplissage(GlobalData, susceptibles ,exposed, infected , recovered, parameters,N);
    e5 = EQM(realRecoveries, recovered) ;
    console.log("param " + parameters[0])  ;
    parameters[0]= parameters[0]+pas ; 
    parameters[1]= parameters[1]-pas ;  
    remplissage(GlobalData, susceptibles ,exposed, infected , recovered,parameters,N);
    e6 = EQM(realRecoveries, recovered) ;
    console.log("param " + parameters[0])  ;
    parameters[1]= parameters[1]+pas ; 
    parameters[2]= parameters[2]-pas ; 
    remplissage(GlobalData, susceptibles ,exposed, infected , recovered, parameters,N);
    e7 = EQM(realRecoveries, recovered) ; 
    parameters[2]= parameters[2]+pas ; 
    parameters[3]= parameters[3]-pas ; 
    remplissage(GlobalData, susceptibles ,exposed, infected , recovered, parameters,N);
    e8 = EQM(realRecoveries, recovered) ;
    parameters[0]= parameters[0]-pas ; 
    parameters[1]= parameters[1]+pas ; 
    if ((e1 <e2 )&&(e1<e3)&&(e1<e4)&&(e1<e5)&&(e1<e6)&&(e1<e7)&&(e1<e8)){
        parameters[0]=parameters[0] + pas ; 
        return e1  ; 
    } 
    else if ((e2 <e1 )&&(e2<e3)&&(e2<e4)&&(e2<e5)&&(e2<e6)&&(e2<e7)&&(e2<e8)){
        parameters[1]=parameters[1] + pas ; 
        return e2  ; 
    } 
    else if ((e3 <e2 )&&(e3<e1)&&(e3<e4)&&(e3<e5)&&(e3<e6)&&(e3<e7)&&(e3<e8)){
        parameters[2]=parameters[2] + pas ; 
        return e3 ; 
    } 
    else if ((e4 <e2 )&&(e4<e3)&&(e4<e1)&&(e4<e5)&&(e4<e6)&&(e4<e7)&&(e4<e8)){
        parameters[3]=parameters[3] + pas ; 
        return e4  ; 
    } 
    else if ((e5 <e2 )&&(e5<e3)&&(e5<e1)&&(e5<e4)&&(e5<e6)&&(e5<e7)&&(e5<e8)){
        parameters[0]=parameters[0] - pas ; 
        return e5  ; 
    } 
    else if ((e6 <e2 )&&(e6<e3)&&(e6<e1)&&(e6<e5)&&(e6<e4)&&(e6<e7)&&(e6<e8)){
        parameters[1]=parameters[1] - pas ; 
        return e6  ; 
    } 
    else if ((e7 <e2 )&&(e7<e3)&&(e7<e1)&&(e7<e5)&&(e7<e6)&&(e7<e4)&&(e7<e8)){
        parameters[2]=parameters[2] - pas ; 
        return e7  ; 
    } 
    else if ((e8 <e2 )&&(e8<e3)&&(e8<e1)&&(e8<e5)&&(e8<e6)&&(e8<e7)&&(e8<e4)){
        parameters[3]=parameters[3] - pas ; 
        return e8  ; 
    } 
    if ( parameters[0] === NaN)
        console.log("direction");
}

const solution = (GlobalData,realRecoveries , susceptibles ,exposed, infected , recovered, parameters,N) => {
    var j = 1000; 
    var i = 0 ; 
    var minimum = EQM(realRecoveries , recovered) ; 
    //console.log("realrec" + realRecoveries) ; 
    //console.log("recovered" + recovered) ; 
    var aux = minimum ; 
    //console.log("minimum" + minimum); 
    while ( i< j){
        aux  = direction(GlobalData,realRecoveries , susceptibles ,exposed, infected , recovered, parameters,N) ; 
        i++ ; 
        if ( aux < minimum)
            minimum = aux;
        }

} 
