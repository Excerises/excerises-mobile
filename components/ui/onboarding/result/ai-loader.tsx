import { BrainCircuit } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

type AILoaderProps = {
  color: string;
};

export default function AILoader({ color }: AILoaderProps) {
  const [rotateAnimation] = useState(() => new Animated.Value(0));

  const [pulseAnimation] = useState(() => new Animated.Value(1));

  useEffect(() => {
    const rotate = Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.08,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    rotate.start();
    pulse.start();

    return () => {
      rotate.stop();
      pulse.stop();
    };
  }, [rotateAnimation, pulseAnimation]);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.outerCircle,
          {
            borderColor: color,
            transform: [{ rotate }],
          },
        ]}
      >
        <View
          style={[
            styles.middleCircle,
            {
              borderColor: color,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.innerCircle,
              {
                borderColor: color,
                transform: [
                  {
                    scale: pulseAnimation,
                  },
                ],
              },
            ]}
          >
            <BrainCircuit size={58} color={color} />
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },

  outerCircle: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
  },

  middleCircle: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  innerCircle: {
    width: 88,
    height: 88,
    borderWidth: 1,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
