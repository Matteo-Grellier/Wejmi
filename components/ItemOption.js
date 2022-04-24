import { View } from "react-native";
import { Box, IconButton, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default ({ text, deleteOption }) => {
  return (
    <View>
      <Box
        bg="#FFFFFF"
        width="70%"
        margin="auto"
        marginBottom="2"
        paddingLeft="3"
        rounded="3xl"
        alignItems="center"
        borderWidth="2"
        borderColor="#00FFC2"
        style={{
          diplay: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {text}

        <IconButton
          onPress={deleteOption}
          icon={<Icon as={Ionicons} name="trash-outline" />}
          borderRadius="full"
          _icon={{
            color: "#FF6161",
            size: "sm",
          }}
          _pressed={{
            bg: "orange.600:alpha.20",
            _icon: {
              name: "trash-sharp",
            },
          }}
        />
      </Box>
    </View>
  );
};
