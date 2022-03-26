import { Input } from "native-base";

export default (props) => {
  return (
    <Input
      bg="#FFFFFF"
      width={props.width === undefined ? "100%" : props.width}
      value={props.value === undefined ? "" : props.value}
      onChangeText={props.onChangeText === undefined ? "" : props.onChangeText}
      margin="auto"
      marginBottom="2"
      px="3"
      rounded="3xl"
      alignItems="center"
      borderWidth="2"
      borderColor="#00FFC2"
      placeholder={props.placeholder}
    />
  );
};
