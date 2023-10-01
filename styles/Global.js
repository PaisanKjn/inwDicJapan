import { StyleSheet } from "react-native";
import { COLORS } from "./COLORS";

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.dicBlack1,
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
    paddingLeft: 20,
    fontWeight: "100",
    backgroundColor: COLORS.dicBlack2,
    width: "100%",
    height: 40,
    borderRadius: 18,
    fontSize: 22,
    color: COLORS.dicWhite
  },
  buttonMain: {
    textAlign: "center",
    backgroundColor: COLORS.dicWhite,
    width: '100%',
    padding: 7,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dicBlue,
  },
  buttonMainDis: {
    textAlign: "center",
    backgroundColor: COLORS.dicWhite,
    width: '100%',
    padding: 7,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dicBlue2,
  },
  buttonSub: {
    textAlign: "center",
    backgroundColor: COLORS.dicBlack2,
    width: '100%',
    padding: 7,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "bold",
    marginTop: 20,
  },
  h3: {
    textAlign: "center",
    color: COLORS.dicWhite,
    fontSize: 15,
  },
  textButton: {
    color: COLORS.dicWhite,
    fontSize: 20,
  },
});
