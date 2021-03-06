import { Select, CheckIcon } from "native-base";
import { View, StyleSheet, Text } from "react-native";

export default ({ listName, chosenValue, setChosenValue, items }) => {
  const changeActualChosenValue = (itemID) => {
    let newActualObj = items.find((item) => item.id === itemID);
    setChosenValue(newActualObj);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{listName}</Text>
      <Select
        borderColor={colors.mainGreenColor}
        fontSize={18}
        borderWidth={2}
        borderRadius={15}
        color={"black"}
        minWidth="200"
        selectedValue={chosenValue.id}
        accessibilityLabel={chosenValue.name}
        placeholder={listName}
        _selectedItem={{
          bg: "#00FFC2",
          endIcon: <CheckIcon size="3" />,
        }}
        mt={1}
        onValueChange={(itemValue) => changeActualChosenValue(itemValue)}
      >
        {items.map((item, index) => (
          <Select.Item key={index} label={item.name} value={item.id} />
        ))}
      </Select>
    </View>
  );
};

const colors = {
  mainGreenColor: "#00FFC2",
  darkGreenColor: "#2B9C81",
  mainGreyColor: "#F3F3F3",
  darkGreyColor: "#9C9C9C",
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    marginLeft: 10,
  },
});
