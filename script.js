const Form = {
  data() {
    return {
      pseudo: "",
      password: "",
      birthDay: "",
      submitForm: false,
    };
  },

  computed: {
    pseudoValidity() {
      return this.pseudo.length >= 8 && this.pseudo.length <= 16;
    },

    passwordValidity() {
      return this.password.length >= 8;
    },

    limitAgeValidity() {
      const currentDate = new Date();
      let birthDate = new Date(this.birthDay);

      // return (
      //   currentDate.getTime() - birthDate.getTime() >
      //   new Date(1988, 0).getTime()
      // );

      let age = currentDate.getFullYear() - birthDate.getFullYear();
      let month = currentDate.getMonth() - birthDate.getMonth();
      if (
        month < 0 ||
        (month === 0 && currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
        console.log(age);
      }

      return age >= 18;

      //   limitAge = new Date(
      //     limitAge.getFullYear() + 18,
      //     limitAge.getMonth() + 1,
      //     +1
      //   );
      //   console.log(currentDate);
      //   console.log(limitAge);

      //   return limitAge <= currentDate;
    },
  },
  methods: {
    inscriptionValid() {
      if (
        this.pseudoValidity &&
        this.passwordValidity &&
        this.limitAgeValidity
      ) {
        this.submitForm = true;
      }
    },
  },

  template: `
    <form v-if="!submitForm" @submit.prevent="inscriptionValid">
        <div class="identite">
            <div>
                <label for="name">Nom :</label>
                <input type="text" id="name" placeholder="Entrez votre nom"/>
            </div>
        
            <div>
                <label for="firstName">Prenom :</label>
                <input type="text" id="firstName" placeholder="Entrez votre prénom"/>
            </div>
            <div>
                <label for="age">Age :</label>
                <input type="date" id="age" v-model="birthDay" placeholder="Entrez votre prénom" :class=" limitAgeValidity ? 'valid' : 'notValid' "/>
            </div> 
        </div>
        <div class="identifiant">
                <div>
                    <label for="pseudo">Votre pseudo :</label>
                    <input type="text" id="pseudo" v-model="pseudo" placeholder="Entrez votre pseudo" :class=" pseudoValidity ? 'valid' : 'notValid' "/>
                </div>
                <div>
                    <label for="motDePasse">Votre mot de passe :</label>
                    <input type="password" id="motDePasse" v-model="password" placeholder="Entrez votre Mot de passe" :class=" passwordValidity ? 'valid' : 'notValid' "/>
                </div>
        </div>
        <input
        
        v-show="pseudoValidity && passwordValidity && limitAgeValidity"
        type="submit"
        value="Proceed to payment"
        />
    </form>
        <p v-else > Votre inscription est confirmée ! </p>
    `,
};

const RootComponent = {
  data() {
    return {};
  },

  components: {
    "form-inscription": Form,
  },

  template: `
  <form-inscription></form-inscription>
  `,
};

Vue.createApp(RootComponent).mount("#root");
