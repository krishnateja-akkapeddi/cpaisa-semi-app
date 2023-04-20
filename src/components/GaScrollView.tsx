import React, {useRef, useState} from 'react';
import {NativeScrollEvent, RefreshControlProps, ScrollView} from 'react-native';

type Props = {
  onEndReached: () => void;
  data: React.ReactNode;
  hasMore: boolean;
  onRefresh?:
    | React.ReactElement<
        RefreshControlProps,
        string | React.JSXElementConstructor<any>
      >
    | undefined;
};

const GaScrollView: React.FC<Props> = ({
  onEndReached,
  data,
  hasMore,
  onRefresh,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollingToTop, setScrollingTop] = useState(true);
  function isCloseToBottom({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) {
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
      refreshControl={onRefresh}
      onScrollToTop={() => setScrollingTop(true)}
      ref={scrollViewRef}
      onScroll={({nativeEvent}) => {
        setScrollingTop(false);

        if (isCloseToTop(nativeEvent)) {
        }
        if (isCloseToBottom(nativeEvent)) {
          hasMore && onEndReached();
        }
      }}>
      {data}
    </ScrollView>
  );
};

export default GaScrollView;
