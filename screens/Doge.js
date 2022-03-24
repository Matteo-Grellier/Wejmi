import { Image } from "native-base";
import { View } from "react-native";

export default () => {
  return (
    <View>
      <Image
        source={require("../assets/Easter_eggs.png")}
        alt="Alternate Text"
        size={600}
      ></Image>
    </View>
  );
};
