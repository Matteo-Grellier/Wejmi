import { View, Text, Select, CheckIcon } from "native-base";

export default (props) => {
  const changeActualChosenValue = (itemID) => {
    let newActualObj = props.items.find((item) => item.id === itemID);
    props.setChosenValue(newActualObj);
  };

  return (
    <View>
      {props.title ? <Text ml={5}>{props.title}</Text> : null}
      <Select
        {...props}
        borderColor={colors.mainGreenColor}
        borderWidth={2}
        borderRadius={15}
        color={"black"}
        _selectedItem={{
          bg: "#00FFC2",
          endIcon: <CheckIcon size="3" />,
        }}
        mt={1}
        onValueChange={(itemValue) => changeActualChosenValue(itemValue)}
      >
        {props.items.map((item, index) => (
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
