import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Pressable } from 'react-native';

const RecordFormModal = ({ visible, onClose, onSave, fieldLabel, fieldValue, setFieldValue }) => {
    console.log({ visible, onClose, onSave, fieldLabel, fieldValue, setFieldValue })
    const [localValue, setLocalValue] = useState(fieldValue);
  
    useEffect(()=> {
        setLocalValue(fieldValue);
    }, [fieldValue]);

    const handleSave = () => {
        setFieldValue(localValue);
        onSave(fieldLabel, localValue);
        onClose();
    };

    return (
        <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
        >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text>{fieldLabel}</Text>
            <TextInput
                value={localValue}
                onChangeText={setLocalValue}
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Pressable onPress={handleSave}>Save</Pressable>
            <Pressable onPress={onClose}>Cancel</Pressable>
            </View>
        </View>
        </Modal>
    );
};

export default RecordFormModal;
