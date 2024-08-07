import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const placeHolderImage = require("./assets/images/background-image.png");
export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isModalVislbe, setIsModalVisible] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);

  const pickeImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowOptions(true);
    } else {
      alert("you did not select any image");
    }
  };

  const onReset = () => {
    setShowOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const onSaveImage = () => {};
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeHolderImageSource={placeHolderImage}
          selectedImage={selectedImage}
        />
        {pickedImage && (
          <EmojiSticker imageSize={40} stickerSource={pickedImage} />
        )}
      </View>
      {showOptions ? (
        <View style={styles.optionContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImage} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label={"Choose a photo"}
            onPress={pickeImageAsync}
          />
          <Button
            label={"Use this photo"}
            onPress={() => setShowOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVislbe} onClose={onModalClose}>
        <EmojiList onSelect={setPickedImage} onCloseModal={onModalClose} />
      </EmojiPicker>

      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
