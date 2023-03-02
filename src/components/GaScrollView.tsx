import React, {useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';

type Props = {
  onEndReached: () => void;
  data: React.ReactNode;
  hasMore: boolean;
  endMessage: React.ReactNode;
};

const GaScrollView: React.FC<Props> = ({
  onEndReached,
  data,
  hasMore,
  endMessage,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollingToTop, setScrollingTop] = useState(true);
  function isCloseToBottom({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) {
    console.log('LAUOUT', layoutMeasurement.height, contentOffset.y);

    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  }

  function isCloseToTop({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) {
    return contentOffset.y == 0;
  }

  return (
    <ScrollView
      onScrollToTop={() => setScrollingTop(true)}
      ref={scrollViewRef}
      onScroll={({nativeEvent}) => {
        setScrollingTop(false);

        if (isCloseToTop(nativeEvent)) {
        }
        if (isCloseToBottom(nativeEvent)) {
          hasMore && console.log('SCROLLING TO TOP');

          hasMore && onEndReached();
        }
      }}>
      {data}
    </ScrollView>
  );
};

export default GaScrollView;
