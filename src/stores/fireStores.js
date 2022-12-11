import { defineStore } from 'pinia'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { auth } from '../config/firebase'


export const firestore = defineStore('firestore', {
    store: () =>{
        return{
            appVerifier: '',
            verify: false,
            recaptcha: 'sign-in-button'
        }
    },
    actions:{
        initReCaptcha(){
            setTimeout(()=>{
                window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                    'size': 'normal',
                    'callback': (response) => {
                      // reCAPTCHA solved, allow signInWithPhoneNumber.
                      // ...
                    },
                    'expired-callback': () => {
                      // Response expired. Ask user to solve reCAPTCHA again.
                      // ...
                    }
                  }, auth)
                //
                this.appVerifier =  window.recaptchaVerifier
            },1000)
            
        },

        sendOtp(data){
            //
            const appVerifier = this.appVerifier
            //
            signInWithPhoneNumber(data.phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                //
                alert('SMS sent')
            }).catch(function (error) {
            // Error; SMS not sent
            // ...
            alert('Error ! SMS not sent')
            });
        },

        verifyOtp(data){
            window.confirmationResult.confirm(data.code).then(function (result) {
                var user = result.user;
                console.log(result);
            })
            .catch(function (error) {
                console.log(error)
            });
        },
    }
})