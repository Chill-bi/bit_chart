import React, { useState, useEffect } from 'react'
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const ChartItemDetail = ({ symbol, data }) => {
    const [rate, setRate] = useState(0);
    const [rateSetColor, setRateSetColor] = useState("green")

    useEffect(() => {
        calcRate(data.closing_price, data.prev_closing_price);

        if (rate < 0) setRateSetColor("blue");
        else if (rate > 0) setRateSetColor("red");
    }, [data]);

    const calcRate = (now_price, close_price) => {
        let diff = now_price - close_price;
        let _rate = ((diff / close_price) * 100).toFixed(2);

        setRate(_rate);
    }

    const rateColor = () => {
        return {
            color: rateSetColor
        }
    }

    return (
        <View style={{ backgroundColor: "#eee", flex: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>최소가</Text>
                <Text style={styles.price}>{parseInt(data.min_price).toLocaleString()} 원</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>최대가</Text>
                <Text style={styles.price}>{parseInt(data.max_price).toLocaleString()} 원</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>전날 종가</Text>
                <Text style={styles.price}>{parseInt(data.prev_closing_price).toLocaleString()} 원</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>변동률</Text>
                <Text style={[styles.price, rateColor()]}>{rate}%</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    price: {
        color: "black",
        alignSelf: "flex-start"
    }
})

export default ChartItemDetail