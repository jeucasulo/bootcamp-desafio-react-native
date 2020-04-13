import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import api from './services/api';

export default function App() {

  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data);
      setRepositories(response.data);
    }).catch(e => console.log(e));
  }, []);

  async function handleLikeRepository(id) {

    const repositoryIndex = repositories.findIndex(rep => rep.id === id)
    repositories[repositoryIndex].likes = (repositories[repositoryIndex].likes + 1);
    // Working as well but so fucking boring, ask FalaDev about imutibilty and stuff
    // const { title, url, techs, likes } = repositories[repositoryIndex];
    // const rep = {
    //   id,
    //   title,
    //   url,
    //   techs,
    //   likes
    // }
    // repositories[repositoryIndex] = rep;
    setRepositories([...repositories]);
    api.post(`repositories/${id}/like`);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />


      <SafeAreaView style={styles.container}>

        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            // <Text style={styles.repository}>{repository.title}</Text>
            <View style={styles.repositoryContainer}>


              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                {/* <Text style={styles.tech}> */}
                {/* ReactJS */}
                {repository.techs.map(tech => <Text key={tech} style={styles.tech}>  {tech} </Text>)}
                {/* </Text> */}
                {/* <Text style={styles.tech}> */}
                {/* Node.js */}
                {/* </Text> */}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtidas
              </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>

          )}
        >
        </FlatList>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
