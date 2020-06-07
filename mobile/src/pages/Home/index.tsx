import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import SelectField from "../../components/SelectField";
import { Item } from 'react-native-picker-select';

interface IBGEUFResponse{
  sigla: string;
}

interface IBGECityResponse{
  nome: string;
}

const Home = () => {
  const [ uf, setUf ] = useState('');
  const [ city, setCity ] = useState('');
  const [ IBGECity, setIBGECity ] = useState<Item[]>([]);
  const [ IBGEUf, setIBGEUf ] = useState<Item[]>([]);

  const navigation = useNavigation();

  let ufItems: Item[] = [];
  let cityItems: Item[] = [];

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      response.data.map(uf => {
        console.log(uf)
        const data = {
          label: uf.sigla,
          value: uf.sigla
        }

        ufItems.push({...data})
      });

      setIBGEUf(ufItems);
    })
  }, []);

  useEffect(() => {
    if(uf === ''){
      return
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(response => {
      response.data.map(uf => {
        const data = {
          label: uf.nome,
          value: uf.nome
        }

        cityItems.push({...data})
      });

      setIBGECity(cityItems);
    })
  }, [uf])
  
  function handleNavigateToPoints(){
      navigation.navigate('Points', {
        uf,
        city
      });
  }
  
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios'? 'padding' : undefined}>
      <ImageBackground 
        source={require('../../assets/home-background.png')} 
        imageStyle={{width: 274, height: 368}}
        style={styles.container}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')}/>
          <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
          <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
        </View>

        <View style={styles.footer}>
          
          <SelectField showItems={IBGEUf} style={styles.input} setLocal={setUf} disable={false} placeholder="Selecione uma UF"/>

          <SelectField showItems={IBGECity} style={styles.input} setLocal={setCity} disable={uf === '' ? true : false} placeholder="Selecione uma cidade"/>

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24}/>
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
          
      </ImageBackground>  
    </KeyboardAvoidingView>
    
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home