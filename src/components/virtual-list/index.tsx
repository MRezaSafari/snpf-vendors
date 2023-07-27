import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Vendor from '../vendor-card';

interface Item {
  id: number;
}

interface VirtualListProps {
  totalItems: number;
  itemHeight: number;
  containerHeight: number;
}

const VirtualList: React.FC<VirtualListProps> = ({
  totalItems,
  itemHeight,
  containerHeight,
}) => {
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    setScrollTop(scrollTop);
  }, []);

  const start = useMemo(() => Math.floor(scrollTop / itemHeight), [
    scrollTop,
    itemHeight,
  ]);

  const end = useMemo(
    () =>
      Math.min(
        Math.ceil((scrollTop + containerHeight) / itemHeight),
        totalItems
      ),
    [scrollTop, containerHeight, itemHeight, totalItems]
  );

  useEffect(() => {
    // Generate the visible items based on the calculated range
    const visibleItems: Item[] = [];
    for (let i = start; i < end; i++) {
      visibleItems.push({ id: i });
    }

    setVisibleItems(visibleItems);
  }, [start, end]);

  const virtualListStyle: React.CSSProperties = useMemo(
    () => ({
      height: `${containerHeight}px`, // Set the container height to enable scrolling
      position: 'relative',
      overflow: 'auto', // Set to 'auto' to enable scrolling
      width: '100%',
    }),
    [containerHeight]
  );

  const listItemStyle: React.CSSProperties = useMemo(
    () => ({
      height: `${itemHeight}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #ccc',
    }),
    [itemHeight]
  );

  return (
    <div style={virtualListStyle} onScroll={handleScroll}>
      {/* {visibleItems.map((item) => (
        <Vendor key={item.id}  />
      ))} */}
    </div>
  );
};

export default VirtualList;
