import { View } from "react-native";
import { COLORS } from "../styles/COLORS";

const SeparateLine = () => {
  return (
    <View
      style={{
        height: 2,
        width: "80%",
        backgroundColor: COLORS.dicBlue,
        alignSelf: "center",
        marginVertical: 20
      }}
    />
  );
};

export default SeparateLine;
