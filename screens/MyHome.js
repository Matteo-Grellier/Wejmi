import { ScrollView, Text } from "react-native";
import ItemOption from "../components/ItemOption";
import ListOptions from "../components/ListOptions";

export default () => {
  return (
    <ScrollView>
      <ListOptions optionTab="category"></ListOptions>
      <ListOptions optionTab="room"></ListOptions>
      <ListOptions optionTab="furniture"></ListOptions>
    </ScrollView>
  );
};
