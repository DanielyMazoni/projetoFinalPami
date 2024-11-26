import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');

  const buscarEndereco = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado');
      } else {
        setEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar CEP');
    }
  };

  const limpardados = async () => {
    setCep("");
    setCpf('');
    setEndereco('');
    setIdade('');
    setNome('');

  };

  const handleSubmit = async () => {
    if (!cpf || !nome || !idade || !endereco) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    try {
      const response = await axios.post('http://172.16.7.11:3000/users', {
        cpf, nome, idade,cep, endereco
      });
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
      limpardados();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={(text) => {
          setCep(text);
          if (text.length === 8) {
            buscarEndereco(text);
          }
        }}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        editable={false}
      
      />

      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 50,
    backgroundColor: "cyan",
  },
  title: {
    color: "gray",
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,

  },
  input: {
    borderWidth: 3,
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderTopColor: 'black',
  },

 
});
