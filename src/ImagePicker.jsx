import * as ImagePicker from "expo-image-picker";

export const getImage = async (cam = true, aspect = undefined)=>{
  if (cam){
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });
    
    if (!res.cancelled){
      return res;
    } 
    return null;
    
  } else {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!res.cancelled){
      return res;
    } 
    return null;
  }
}