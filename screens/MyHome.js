import { ScrollView, Text } from "react-native";
import ItemOption from "../components/ItemOption";
import ListOptions from "../components/ListOptions";

export default () => {
  return (
    <ScrollView>
      <ListOptions optionTab="Catégories"></ListOptions>
      <ListOptions optionTab="Pièces"></ListOptions>
      <ListOptions optionTab="Meubles"></ListOptions>
    </ScrollView>
  );
};
