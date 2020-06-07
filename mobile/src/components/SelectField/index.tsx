import React from 'react';
import { StyleSheet } from "react-native";
import RNPickerSelect, { Item } from 'react-native-picker-select'

interface Props {
    setLocal(value: any): void;
    style: {};
    showItems: Item[];
    disable: boolean;
    placeholder: string
}

const SelectField = (props: Props) => {
    const placeholder = {
        label: props.placeholder,
        value: null,
        color: '#9EA0A4',
      };
    return(
        <RNPickerSelect onValueChange={(value) => props.setLocal(value)} items={props.showItems} style={styles} disabled={props.disable} placeholder={placeholder}/>
    )
}

const styles = StyleSheet.create({
    inputIOS: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },
    inputAndroid: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
        color: "#322153"
    }
})

export default SelectField;
