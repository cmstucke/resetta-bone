import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signup, login, clearSessionErrors } from '../../store/session';

export default function SignUp() {
    const [isSignUp, setIsSignUp] = useState(true);
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState('en');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    // const [image, setImage] = useState(null);
    // const [photoUrl, setPhotoUrl] = useState(null);
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
          dispatch(clearSessionErrors());
        };
      }, [dispatch]);
    const update = field => {
        let setState;

        switch (field) {
            case 'email':
            setState = setEmail;
            break;
            case 'password':
            setState = setPassword;
            break;
            case 'password2':
            setState = setPassword2;
            break;
            default:
            throw Error('Unknown field in Signup Form');
        }

        return e =>{
          setState(e);
        }
    }
    const userSubmit = e => {
        e.preventDefault();
        const user = {
          email,
        //   image,
          password,
          language,
          emt: false
        };
        if(isSignUp) {
           dispatch(signup(user));
        } else {
            dispatch(login(user));
        }

    }

    return (
        <SafeAreaView style={styles.signupContainer}>
            <View style={styles.formContainer}>
            {<Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Welcome to Resetta Bone!</Text>}
            <TextInput
                style={{height: 40}}
                placeholder={isSignUp ? "Please a provide a valid email": "Enter email"}
                onChangeText={update('email')}
                defaultValue={email}
            />
            <TextInput
                style={{height: 40}}
                placeholder={isSignUp ? "Create password" : "Enter password"}
                onChangeText={update('password')}
                defaultValue={password}
            />
            {isSignUp && (<TextInput
                style={{height: 40}}
                placeholder="Confirm password"
                onChangeText={update('password2')}
                defaultValue={password2}
            />)}
            <Pressable style={styles.buttonContainer} onPress={userSubmit}>{isSignUp ? <Text style={{color: 'white', fontWeight: 'bold'}}>Sign Up</Text> : <Text style={{color: 'white', fontWeight: 'bold'}}>Log In</Text>}</Pressable>
            <Pressable style={{alignItems: 'center'}} onPress={()=> setIsSignUp(!isSignUp)}>{isSignUp ? <Text>Already a member? Sign in</Text> : <Text>New to Resetta? Create an account</Text>}</Pressable>
            </View>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    signupContainer : {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        alignItems: 'center'
    },
    formContainer: {

        padding: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3
    },
    buttonContainer: {
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: 'red',
        borderColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10
    }
})
