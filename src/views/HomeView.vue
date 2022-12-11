<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '@/config/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";




  const verifier = ref('')
  const form = ref({
    phone: ''
  })


  const initialize = ()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        console.log(response)
      }
    }, auth);

    verifier.value = window.recaptchaVerifier 
  }

  const sendOtp = (data) =>{
            //
        const appVerifier = verifier.value
        //
        signInWithPhoneNumber(auth, form.value.phone, appVerifier)
        .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            console.log(confirmationResult);
            window.confirmationResult = confirmationResult;
            //
            alert('SMS sent')
        }).catch(function (error) {
          console.error(error)
          alert('Error ! SMS not sent')
        });
  }


  onMounted(() => {
    initialize()
  })

  
  const VerifyForm = ref({
    code: ''
  })
</script>



<template>
  <main>
    <div>
      <form @submit.prevent="sendOtp()">
        <input type="text" v-model="form.phone" placeholder="Phone Number">
        <div id="recaptcha-container"></div>
        <button>Verify</button>
      </form>

      <form action="">
        <input type="text" v-model="VerifyForm.phone" placeholder="Phone Number">
        <button>Verify</button>
      </form>
    </div>
  </main>
</template>
