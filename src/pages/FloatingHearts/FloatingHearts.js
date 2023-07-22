import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native';
import { Easing } from 'react-native-reanimated';

let heartCount = 1;

const { height } = Dimensions.get('window')
const animationEndY = Math.ceil(height * 0.7)
const negatioveEndY = animationEndY * -1

const getRandomNumber = (min, max) => Math.random() * (max - min) + min

export class FloatingHearts extends React.Component {
    state = {
        hearts: []
    };

    addHeart = () => {
        this.setState({
            hearts: [
                ...this.state.hearts,
                {
                    id: heartCount,
                    right: getRandomNumber(20, 150)
                }
            ]
        },
            () => {
                heartCount++;
            }
        )
    }

    removeHeart = (id) => {
        this.setState({
            hearts: this.state.hearts.filter(heart => {
                return heart.id !== id
            })
        })
    }

    render() {
        console.log(this.state)
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    {this.state.hearts.map((heart, index) => (
                        <HeartContainer
                            key={index}
                            style={{ right: heart.right }}
                            onComplete={() => this.removeHeart(heart.id)} />
                    ))}
                </View>
                <TouchableOpacity onPress={this.addHeart} style={styles.addButton}>
                    <Text style={styles.buttonIcon}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class HeartContainer extends React.Component {
    state = {
        position: new Animated.Value(0)
    }

    static defaultProps = {
        onComplete() { }
    }

    componentDidMount() {
        this.yAnimation = this.state.position.interpolate({
            inputRange: [negatioveEndY, 0],
            outputRange: [animationEndY, 0]
        })

        Animated.timing(this.state.position, {
            duration: 2000,
            toValue: negatioveEndY,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(this.props.onComplete);
    }

    getHeartsStyle = () => {
        return {
            transform: [{ translateY: this.state.position }]
        }
    }

    render() {
        return (
            <Animated.View style={[styles.heartContainer, this.getHeartsStyle(), this.props.style]}>
                <Heart color="purple" />
            </Animated.View>
        )
    }
}

const Heart = props => (
    <View {...props} style={[styles.heart, props.styles]}>
        <View style={[styles.cirlce, {
            backgroundColor: props.color,
        }]} />
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addButton: {
        backgroundColor: '#378ad9',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 32,
        bottom: 32
    },
    buttonIcon: {
        fontSize: 32,
        color: 'white',
        lineHeight: 32,
        fontWeight: '300'
    },
    cirlce: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    heartContainer: {
        position: 'absolute',
        bottom: 30,
        backgroundColor: 'transparent',
    },
    heart: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
})