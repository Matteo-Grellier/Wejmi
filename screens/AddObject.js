import { View, Text, StyleSheet } from "react-native";
import SelectItems from "../components/SelectItems.js"
import FormObject from "../components/FormObject.js";
import BDD from "./BDD.js";

export default () => {
  return (
    <View style={styles.container}>
      <FormObject isCreatingForm={true}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
