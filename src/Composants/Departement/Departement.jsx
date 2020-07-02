import React from 'react' ; 
import {NativeSelect , FormControl } from '@material-ui/core' ; 

import styles from './Departement.module.css' ; 


const Departement  = ({ handleCountryChange , handleTypeChange}) =>   {
    return(
          <FormControl className={styles.FormControl}>
              Country
            <NativeSelect defaultValue="global" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="global"> GlobalData </option>
                <option value="Arabie Saoudite"> Arabie Saoudite </option>
                <option value="Allemagne"> Allemagne </option>
                <option value="Bulgarie"> Bulgarie </option>
                <option value="Albanie"> Albanie </option>
                <option value="Luxembourg"> Luxembourg </option>
                <option value="Bangladesh"> Bangladesh </option>
                <option value="Guinée-Bissau"> Guinée-Bissau </option>
                <option value="Grèce"> Grèce </option>
                <option value="Irlande"> Irlande </option>
                <option value="Maroc"> Maroc </option>
                <option value="AlleSierra Leoneagne"> AlleSierra Leoneagne </option>
                <option value="Afghanistan"> Afghanistan </option>
                <option value="Finlande"> Finlande </option>
                <option value="Belgique"> Belgique </option>
                <option value="Bahamas"> Bahamas </option>
                <option value="Pologne"> Pologne </option>
                <option value="Lettonie"> Lettonie </option>
                <option value="Brésil"> Brésil </option>
                <option value="Cameroun"> Cameroun </option>
                <option value="République Centrafricaine"> République Centrafricaine </option>
                <option value="Macédoine"> Macédoine </option>
                <option value="Oman"> Oman </option>
                <option value="Maurice"> Maurice </option>
                <option value="Cambodge"> Cambodge </option>
                <option value="Géorgie"> Géorgie </option>
                <option value="Malte"> Malte </option>
                <option value="Papouasie-Nouvelle-Guinée"> Papouasie-Nouvelle-Guinée </option>
                <option value="Côte d'Ivoire"> Côte d'Ivoire </option>
                <option value="Népal"> Népal </option>
                <option value="Barbade"> Barbade </option>
                <option value="Soudan du sud"> Soudan du sud </option>
                <option value="Norvège"> Norvège </option>
                <option value="Honduras"> Honduras </option>
                <option value="Suisse"> Suisse </option>
                <option value="Chine"> Chine </option>
                <option value="Suède"> Suède </option>
                <option value="Malawi"> Malawi </option>
                <option value="Qatar"> Qatar </option>
                <option value="Roumanie"> Roumanie </option>
                <option value="Japon"> Japon </option>
                <option value="Israël"> Israël </option>
                <option value="Guinée Équatoriale"> Guinée Équatoriale </option>
                <option value="Grenade"> Grenade </option>
                <option value="Belize"> Belize </option>
                <option value="Chypre"> Chypre </option>
                <option value="Colombie"> Colombie </option>
                <option value="Singapour"> Singapour </option>
                <option value="Botswana"> Botswana </option>
                <option value="Pays-Bas"> Pays-Bas </option>
                <option value="Bosnie-Herzégovine"> Bosnie-Herzégovine </option>
                <option value="Mauritanie"> Mauritanie </option>
                <option value="France"> France </option>
                <option value="Libye"> Libye </option>
                <option value="Australie"> Australie </option>
                <option value="Italie"> Italie </option>
                <option value="Pakistan"> Pakistan </option>
                <option value="Tunisie"> Tunisie </option>
            </NativeSelect>
            Display mode
            <NativeSelect defaultValue="cumul" onChange={(e) => handleTypeChange(e.target.value)}>
                <option value="cumul"> Représentation cumulée </option>
                <option value="diff"> Représentation differentielle </option>
            </NativeSelect> 
        </FormControl>
       
    )
}

export default Departement ;