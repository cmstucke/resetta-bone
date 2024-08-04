import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signup, login, clearSessionErrors } from '../../store/session';

export default function SignUp() {
    const [isSignUp, setIsSignUp] = useState(true);
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState('');
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
        <View>
            {isSignUp ? <Text>Sign Up</Text> : <Text>Log In</Text>}
            <TextInput 
                style={{height: 40}} 
                placeholder="email"
                onChangeText={update('email')}
                defaultValue={email}
            />
            <TextInput 
                style={{height: 40}} 
                placeholder="password"
                onChangeText={update('password')}
                defaultValue={password}
            />
            {isSignUp && (<TextInput 
                style={{height: 40}} 
                placeholder="password confirmation"
                onChangeText={update('password2')}
                defaultValue={password2}
            />)}
            <Pressable onPress={userSubmit}>{isSignUp ? <Text>Sign Up</Text> : <Text>Log In</Text>}</Pressable>
            <Pressable onPress={()=> setIsSignUp(!isSignUp)}>{isSignUp ? <Text>Switch to Log in</Text> : <Text>Switch to Sign Up</Text>}</Pressable>
        </View>
    )
}