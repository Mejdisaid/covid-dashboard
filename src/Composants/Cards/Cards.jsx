import React from 'react' ; 
import { Card, CardContent, Typography, Grid } from '@material-ui/core' ;
import styles from './Cards.module.css' ;
import CountUp from 'react-countup';
import cx from 'classnames' ;



const Cards  = ( {data:{GlobalData , PaysData} , country} ) =>   {

    var valueFound = false ;
     
    if (!GlobalData)
        return 'Loading ...';
        
    console.log(country) ;

    var infection  = GlobalData[0].Infection ; 
    var active  =   GlobalData[0].Infection * GlobalData[0].TauxInfection * 0.01  ;
    var recovered  = GlobalData[0].Guerisons; 
    var deaths     = GlobalData[0].Deces; 
    var date       = new Date(GlobalData[0].Date).toDateString() ; 

    if (( country !== '')&&(country !== 'global')){
        for (let i =0 ; !valueFound ; i++ ){
            if (PaysData[i].Pays === country){
                valueFound = true ;
                infection  = PaysData[i].Infection ; 
                active  = PaysData[i].Infection * PaysData[i].TauxInfection * 0.01  ;
                recovered  = PaysData[i].Guerisons; 
                deaths     = PaysData[i].Deces; 
                date       = new Date(PaysData[i].Date).toDateString() ; 

            }
        }
    }

    
    return(
        <div className={styles.container}>
            <Grid container spacing = {3} justify="center">
                <Grid item component={Card}  xs = {12} md = {3} className={cx(styles.card , styles.infected)} >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> Infected </Typography>
                        <Typography variant="h5" > 
                            <CountUp   start = {0}  end  = {infection} duration = {2.5} separator = "," />
                        </Typography>
                        <Typography color="textSecondary" > {date} </Typography>
                        <Typography variant="body2" > Total number of infected</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card}  xs = {12} md = {3} className={cx(styles.card , styles.active)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> Active cases </Typography>
                        <Typography variant="h5" > 
                            <CountUp   start = {0}  end  = {active} duration = {2.5} separator = "," />
                        </Typography>
                        <Typography color="textSecondary" > {date} </Typography>
                        <Typography variant="body2" > Number of active cases</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs = {12} md = {3} className = { cx(styles.card , styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> Recovered </Typography>
                        <Typography variant="h5" > 
                            <CountUp   start = {0}  end  = {recovered} duration = {2.5} separator = "," /> 
                        </Typography>
                        <Typography color="textSecondary" > {date} </Typography>
                        <Typography variant="body2" > number of Recovered</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs = {12} md = {3} className = { cx(styles.card , styles.deaths)} >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> Deaths </Typography>
                        <Typography variant="h5" > 
                            <CountUp   start = {0}  end  = {deaths} duration = {2.5} separator = "," /> 
                        </Typography>
                        <Typography color="textSecondary" > {date} </Typography>
                        <Typography variant="body2" > number of Deaths</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards ;