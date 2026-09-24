import { useEffect, useRef, useState } from "react";

import {
    Dimensions,
    GestureResponderEvent,
    StyleSheet,
    View,
} from "react-native";

import { Plus } from "lucide-react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

type FloatingWorkoutButtonProps = {
  onPress: () => void;
};

const BUTTON_SIZE = 58;
const SIDE_MARGIN = 20;
const BOTTOM_MARGIN = 16;

const AUTO_HINT_DELAY = 3000;
const MOVE_THRESHOLD = 6;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const clampX = (value: number) => {
  const minX = -(SCREEN_WIDTH - BUTTON_SIZE - SIDE_MARGIN * 2);

  return Math.max(minX, Math.min(value, 0));
};

const clampY = (value: number) => {
  const minY = -(SCREEN_HEIGHT - BUTTON_SIZE - BOTTOM_MARGIN - 24);

  return Math.max(minY, Math.min(value, 0));
};

export default function FloatingWorkoutButton({
  onPress,
}: FloatingWorkoutButtonProps) {
  const themeColor = useThemeColor();

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [showHint, setShowHint] = useState(false);

  const startPosition = useRef({
    x: 0,
    y: 0,
  });

  const startTouch = useRef({
    x: 0,
    y: 0,
  });

  const isDragging = useRef(false);

  useEffect(() => {
    if (showHint) {
      return;
    }

    const timer = setTimeout(() => {
      setShowHint(true);
    }, AUTO_HINT_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [showHint]);

  const handleResponderGrant = (event: GestureResponderEvent) => {
    if (showHint) {
      return;
    }

    isDragging.current = false;

    startPosition.current = {
      x: position.x,
      y: position.y,
    };

    startTouch.current = {
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    };
  };

  const handleResponderMove = (event: GestureResponderEvent) => {
    if (showHint) {
      return;
    }

    const dx = event.nativeEvent.pageX - startTouch.current.x;

    const dy = event.nativeEvent.pageY - startTouch.current.y;

    if (Math.abs(dx) > MOVE_THRESHOLD || Math.abs(dy) > MOVE_THRESHOLD) {
      isDragging.current = true;
    }

    if (!isDragging.current) {
      return;
    }

    setPosition({
      x: clampX(startPosition.current.x + dx),
      y: clampY(startPosition.current.y + dy),
    });
  };

  const handleResponderRelease = () => {
    if (showHint) {
      setShowHint(false);
      return;
    }

    if (!isDragging.current) {
      onPress();
    }

    isDragging.current = false;
  };

  const handleResponderTerminate = () => {
    isDragging.current = false;
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          transform: [
            {
              translateX: position.x,
            },
            {
              translateY: position.y,
            },
          ],
        },
      ]}
      pointerEvents="box-none"
    >
      {showHint && (
        <View
          style={[
            styles.hint,
            {
              backgroundColor: themeColor.card,
              borderColor: themeColor.primary,
            },
          ]}
        >
          <UIText
            style={[
              styles.hintText,
              {
                color: themeColor.foreground,
              },
            ]}
          >
            Start a new workout!
          </UIText>

          <View
            style={[
              styles.hintTail,
              {
                backgroundColor: themeColor.card,
                borderRightColor: themeColor.primary,
                borderBottomColor: themeColor.primary,
              },
            ]}
          />
        </View>
      )}

      <View
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={handleResponderGrant}
        onResponderMove={handleResponderMove}
        onResponderRelease={handleResponderRelease}
        onResponderTerminate={handleResponderTerminate}
        style={[
          styles.button,
          {
            backgroundColor: themeColor.primary,
          },
        ]}
      >
        <Plus size={30} color={themeColor.black} strokeWidth={2.5} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    right: SIDE_MARGIN,
    bottom: BOTTOM_MARGIN,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },

  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  hint: {
    position: "absolute",
    right: 0,
    bottom: BUTTON_SIZE + 12,
    minWidth: 175,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },

  hintText: {
    fontSize: 12,
    fontWeight: "600",
  },

  hintTail: {
    position: "absolute",
    right: 18,
    bottom: -8,
    width: 15,
    height: 15,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    transform: [{ rotate: "45deg" }],
  },
});
