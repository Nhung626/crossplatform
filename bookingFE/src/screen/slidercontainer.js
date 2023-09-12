import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@miblanchard/react-native-slider';

const SliderContainer = (props) => {
    const { caption, children, sliderValue, trackMarks, vertical } = props;
    const [value, setValue] = React.useState(sliderValue || [0, 100]);

    const renderTrackMarkComponent = (index) => {
        const currentMarkValue = trackMarks[index];
        const currentSliderValue = Array.isArray(value) ? value[0] : value;
        const style =
            currentMarkValue >= currentSliderValue
                ? styles.activeMark
                : styles.inactiveMark;
        return <View style={style} />;
    };

    return (
        <View style={styles.sliderContainer}>
            <View style={styles.titleContainer}>
                <Text>{caption}</Text>
                <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
            </View>
            <Slider
                animateTransitions
                maximumTrackTintColor="#d3d3d3"
                maximumValue={100}
                minimumTrackTintColor="#1fb28a"
                minimumValue={0}
                step={2}
                thumbTintColor="#1a9274"
                value={value}
                onValuesChange={(newValues) => setValue(newValues)}
                trackMarks={trackMarks}
                renderTrackMarkComponent={renderTrackMarkComponent}
                vertical={vertical}
            />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        marginBottom: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    activeMark: {
        height: 4,
        backgroundColor: '#1fb28a',
    },
    inactiveMark: {
        height: 4,
        backgroundColor: '#d3d3d3',
    },
});

export default SliderContainer;
