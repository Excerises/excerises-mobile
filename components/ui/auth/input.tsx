import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  prefix?: React.ReactNode;
}

export default function AuthTextInput(props: Props) {
  const { style, ...other } = props;

  return (
    <View style={[styles.group, style as any]}>
      {props.prefix}
      <TextInput style={styles.input} {...other} />
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    display: "flex",
    borderRadius: 50,
    flexDirection: "row",
    height: 46,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: "100%",
    borderWidth: 0,
    borderColor: "transparent",
  },
});
