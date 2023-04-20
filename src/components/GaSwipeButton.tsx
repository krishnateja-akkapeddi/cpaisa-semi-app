import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  PanResponderGestureState,
} from 'react-native';

interface SwipeButtonProps {
  title: string;
  backgroundColor?: string;
  onSwipeSuccess: () => void;
  onSwipeFail: () => void;
}

const SwipeButton = ({
  title,
  backgroundColor = 'blue',
  onSwipeSuccess,
  onSwipeFail,
}: SwipeButtonProps) => {
  const [swiped, setSwiped] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (
          _event,
          gestureState: PanResponderGestureState,
        ) => {
          // Calculate the new slider position based on the gesture
          const newSliderPosition = Math.max(
            0,
            Math.min(gestureState.dx, sliderWidth),
          );
          setSliderPosition(newSliderPosition);
        },
        onPanResponderRelease: (
          _event,
          gestureState: PanResponderGestureState,
        ) => {
          // Check if the swipe was successful or not
          if (gestureState.dx >= sliderWidth * 0.75) {
            setSwiped(true);
            onSwipeSuccess();
          } else {
            setSliderPosition(0);
            onSwipeFail();
          }
        },
      }),
    [sliderWidth, onSwipeSuccess, onSwipeFail],
  );

  const handleLayout = (event: any) => {
    // Save the width of the slider when it's rendered
    setSliderWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={{backgroundColor, borderRadius: 10}}>
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => setSwiped(!swiped)}>
        <Text style={{textAlign: 'center'}}>{title}</Text>
      </TouchableOpacity>
      <View style={{position: 'relative'}}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: sliderPosition,
            height: '100%',
            backgroundColor: 'white',
            borderRadius: 10,
          }}
          onLayout={handleLayout}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
};

export default SwipeButton;
