import React from 'react' ; 
import styles from './ModelInput.module.css' ; 
import { FormControl, NativeSelect } from '@material-ui/core';

const ModelInput  = ({handleInputChange , N ,s0 ,e0, i0 , r0 , a ,b,c, f}) =>   {
    var Population = N ; 
    var S0  = s0; 
    var I0  = i0 ; 
    var E0 = e0 ;
    var R0  = r0; 
    var A   = a  ; 
    var B  = b ; 
    var C  = c ; 
    var F  = f ; 
    var Choice  ;
    return(
        <form onSubmit = {(e) => handleInputChange(e.target.value)} >
            <div className = {styles.description}>
                <p>
                    Ci-dessous nous avons le modèle SIR, veuillez introduire les données initiales nécessaires conformément aux équations différentielles suivantes : <br></br>
                 <br></br>
                <br></br>
                S0 : Le nombre initial des personnes susceptibles à avoir le virus.
                <br></br>
                E0 : Le nombre initial des personnes exposées au virus.
                <br></br>
                I0 : Le nombre initial des personnes infectées.
                <br></br>
                R10 : Le nombre initial des personnes présentées à l'hopital.
                <br></br>
                a  : Coefficient de transmission
                <br></br>
                b  : coefficient de guérison
                <br></br>
                c  : coefficient de guérison
                <br></br>
                f  : coefficient de guérison
                <br></br>
                <br></br>
                dSdt = -a.S.I/N <br></br>  
                dEdt = a.S.I/N -b.E<br></br>
                dIdt = b.E - c.I<br></br>
                dR1dt = f.c.I <br></br>
                dR2dt = (1-f).c.I <br></br>
                </p>
            </div>

            <div>           
                <label> Population </label>
                <input type="number" placeholder="12 000 000" onChange={(e) => { Population = e.target.value ;}}/>
                <label> S0 </label>
                <input type="number" placeholder="12 000 000" onChange={(e) => { S0 = e.target.value ;}} />
                <label> E0 </label>
                <input type="number" placeholder="1" onChange={(e) => { E0 = e.target.value ;}} />
                <label> I0 </label>
                <input type="number" placeholder="1" onChange={(e) => { I0 = e.target.value ;}} />
                <label> R0 </label>
                <input type="number" placeholder="0" onChange={(e) => { R0 = e.target.value ;}} />
                <label> a </label>
                <input type="number" placeholder="0.3" onChange={(e) => { A = e.target.value ;}} />
                <label> b </label>
                <input type="number" placeholder="0.2" onChange={(e) => { B = e.target.value ;}} />
                <label> c </label>
                <input type="number" placeholder="0.1" onChange={(e) => { C = e.target.value ;}} />
                <label> f </label>
                <input type="number" placeholder="0.15" onChange={(e) => { F = e.target.value ;}} />
                <button type="button" onClick = {(e) => handleInputChange(Population, S0 ,E0, I0 , R0 , A,B,C, F, Choice)} > Show Results</button>
                <FormControl>
                    <NativeSelect defaultValue="def" onChange={(e) => {Choice = e.target.value ;}}>
                        <option value="def"> default results </option>
                        <option value="opt"> optimal results </option>
                    </NativeSelect>
                </FormControl>
            </div>
            
        </form>
    )
}

export default ModelInput ;