import { StyleSheet } from "react-native";
import { COLORS } from "./COLORS";

export const globalStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dicBlack1,
    flex: 1,
    paddingHorizontal: 40,
  },
  input: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "100",
    backgroundColor: COLORS.dicWhite,
    width: "100%",
    height: 40,
    borderRadius: 15,
    fontSize: 22,
  },
  buttonMain: {
    textAlign: "center",
    backgroundColor: COLORS.dicWhite,
    width: 100,
    height: 35,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dicBlue,
  },
  buttonSub: {
    textAlign: "center",
    backgroundColor: COLORS.dicWhite,
    width: 100,
    height: 35,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: null,
    borderColor: COLORS.dicBlue,
    borderWidth: 1,
  },
  h1: {
    textAlign: "center",
    color: COLORS.dicWhite,
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 20,
  },
  h2: {
    textAlign: "center",
    color: COLORS.dicWhite,
    fontSize: 24,
    fontWeight: "500",
    marginTop: 20,
  },
  textButton: {
    color: COLORS.dicWhite,
    fontSize: 20,
  },
});
