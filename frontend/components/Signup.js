import {View, Text, TextInput, StyleSheet, Button} from 'react-native'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as sessionActions from '../store/session'

export default function Signup() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log({email, password})

        if(password === confirmPassword) {
            return dispatch(sessionActions.signup({email, password}))
        }
    }

    return (
        <View style={styles.formContainer}>
            <Text>Sign Up</Text>
            <TextInput value={email} onChangeText={setEmail} keyboardType='email-address' placeholder='Enter your email'/>
            <TextInput value={password} onChangeText={setPassword} placeholder='Enter your password' secureTextEntry />
            <TextInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder='Confirm password' secureTextEntry/>
            <Button onPress={handleSubmit} title="Submit"></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        justifyContent: 'center'
    }
})
