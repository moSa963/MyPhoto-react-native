import React from 'react';
import { StyleSheet, View, Text, TextInput as Input, Animated, TextInputProps } from 'react-native';
import { Light, useTheme } from '../context/ThemeContext';

const AnimatedTextInput = Animated.createAnimatedComponent(Input);

const TextInput = (props: TextInputProps) => {
  const [foucus, setFoucus] = React.useState(false);
  const anim = React.useRef(new Animated.Value(0.1)).current;
  const [theme] = useTheme();

  const {error, flex, value, ...rest} = props;

  React.useEffect(()=>{
    Animated.timing(anim,
      {
        toValue: foucus ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }
    ).start();
  }, [anim, foucus]);

  const handleFoucus = ()=>{
    setFoucus(true);
  }

  const handleBlur = ()=>{
    setFoucus(false);
  }

  return (
    <View style={{...styles.root, flex: flex}}>
      {
        error && <Text style={{color: 'red'}}>{error}</Text>
      }
      <View style={styles.textRoot}>


        <AnimatedTextInput placeholderTextColor={theme.colors.text} value={value}
            onFocus={handleFoucus}
            onBlur={handleBlur}
            style={{...styles.textInput, color: theme.colors.text, borderBottomColor: theme.colors.primary,
              borderBottomWidth: anim.interpolate({inputRange: [0, 1], outputRange: [1, 2]}),
            }}
            
            {...rest}
          />


        <Animated.View style={{...styles.background, backgroundColor: theme.colors.border,
          opacity: anim.interpolate({inputRange: [0, 1], outputRange: [0, 0.5]}),
          transform: [{
            scaleX: anim,
          },{translateX: anim},]
        }}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root:{
    marginBottom: 15,
  },
  textRoot: {
    overflow: 'hidden',
    maxHeight: 250,
  },
  textInput:{
    position: 'relative',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  background:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});


TextInput.defaultProps =
{
  errors: [],
  theme: Light,
  fontSize: 15,
}

export default TextInput;