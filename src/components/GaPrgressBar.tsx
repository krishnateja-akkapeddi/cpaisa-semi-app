import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {hp} from '../utility/responsive/ScreenResponsive';

const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#4aae4f',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#4aae4f',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
};

const dummyData = [
  {
    title: 'Step 1',
    description: 'Description for step 1',
  },
  {
    title: 'Step 2',
    description: 'Description for step 2',
  },
  {
    title: 'Step 3',
    description: 'Description for step 3',
  },
  {
    title: 'Step 4',
    description: 'Description for step 4',
  },
  {
    title: 'Step 5',
    description: 'Description for step 5',
  },
];

const VerticalStepIndicator = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: any}) => {
      setCurrentPage(viewableItems[0]?.index || 0);
    },
    [],
  );

  const renderItem = ({item}: {item: {title: string; description: string}}) => {
    return (
      <View style={styles.step}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPage}
        labels={dummyData.map(item => item.title)}
        stepCount={dummyData.length}
        direction="horizontal"
      />
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    height: hp(20),
  },
  step: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default VerticalStepIndicator;
