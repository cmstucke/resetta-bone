import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, Modal, FlatList, TouchableOpacity,  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signup, login, clearSessionErrors } from '../../store/session';
import i18next, { languageResources } from "../../services/i18next"
import { useTranslation } from 'react-i18next';
import languageList from "../../services/languagesList.json"
import { changeLanguage } from 'i18next';

export default function SignUp() {
    const {t} = useTranslation();

    const [visible, setVisible] = useState(false)

    const [isSignUp, setIsSignUp] = useState(true);
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState('en');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    // const [image, setImage] = useState(null);
    // const [photoUrl, setPhotoUrl] = useState(null);
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    const changeLang = (lng) => {
        i18next.changeLanguage(lng)
        setVisible(false)
    }

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

            <Modal visible={visible} onRequestClose={() => setVisible(false)}>
                <View style={styles.languageLists}>
                    <FlatList data={Object.keys(languageResources)} renderItem={({item}) => <TouchableOpacity
                    onPress={() => changeLang(item)}>
                        <Text style={{padding: 10, color: 'white'}}>{languageList[item].nativeName}</Text>
                    </TouchableOpacity>}/>
                </View>
            </Modal>

            <View style={styles.formContainer}>

            {<Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>{t("welcome")}</Text>}
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Text>{t("select-language")}</Text>
            </TouchableOpacity>
            <TextInput
                style={{height: 40, fontWeight: '100'}}
                placeholder={isSignUp ? t("valid-email"): t("enter-email")}
                onChangeText={update('email')}
                defaultValue={email}
            />
            <TextInput
                style={{height: 40, fontWeight: '100'}}
                placeholder={isSignUp ? t("create-pass") : t("enter-pass")}
                onChangeText={update('password')}
                defaultValue={password}
            />
            {isSignUp && (<TextInput
                style={{height: 40, fontWeight: 100}}
                placeholder={t("confirm-pass")}
                onChangeText={update('password2')}
                defaultValue={password2}
            />)}
            <Pressable style={styles.buttonContainer} onPress={userSubmit}>{isSignUp ? <Text style={{color: 'white', fontWeight: 'bold'}}>{t("signup")}</Text> : <Text style={{color: 'white', fontWeight: 'bold'}}>{t("login")}</Text>}</Pressable>
            <Pressable style={{alignItems: 'center'}} onPress={()=> setIsSignUp(!isSignUp)}>{isSignUp ? <Text>{t("member")}</Text> : <Text>{t("create-account")}</Text>}</Pressable>
            </View>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    signupContainer : {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#6495ED',
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
        backgroundColor: '#6495ED',
        borderColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10
    },
    languageLists: {
        flex: 1,
        backgroundColor: '#6495ED',
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
})
