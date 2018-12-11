<template>
	<v-layout justify-center align-center>
    <v-flex>
      <v-card>
        <v-container
          fluid
          grid-list-md 
        > 
          <v-layout row wrap>
            <v-flex xs12>
              <v-card dark>
                <v-img :src="imageUrl" 
                  max-height="300"                  
                >
                  <v-layout align-end>
                    <v-spacer></v-spacer>
                    <v-card dark color="blue lighten-1">
                      <v-flex shrink>
                        <v-btn icon>
                          <v-icon>mdi-cards-heart</v-icon>
                        </v-btn>
                        <v-btn icon @click="pickFile">
                          <v-icon>mdi-image-search-outline</v-icon>
                        </v-btn>
                        <input
                          type="file"
                          style="display: none"
                          ref="image"
                          accept="image/*"
                          @change="onFilePicked"
                        >
                      </v-flex>
                    </v-card>
                  </v-layout>
                </v-img>
              </v-card>
            </v-flex>

            <v-flex md6>
              <v-text-field
                label="ID"
                v-model="userId"
                readonly
              ></v-text-field>
            </v-flex>

            <v-flex md6>
              <v-text-field
                label="E-mail"
                v-model="email"
                required
              ></v-text-field>
            </v-flex>

            <v-flex md6>
              <v-text-field
                label="Name"
                v-model="name"
                :counter="20"
                required
              ></v-text-field>
            </v-flex>

            <v-flex md6>
              <v-text-field
                label="Nick Name"
                v-model="nick_name"
                :counter="30"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          
          <div align="center">
            <v-btn @click="submit">저장</v-btn>
            <v-btn @click="cancel">취소</v-btn>
          </div>
        </v-container>
      </v-card>
    </v-flex>
	</v-layout>
</template>

<script>
// import VeeValidate from 'vee-validate';

export default {
  name: 'my-info',
  props: {
    dialogVisible: Boolean,
  },
  data: () => ({
    name: '',
    nick_name: '',
    email: '',
    tile: true,
    avatarSize: 256,
    imageName: '',
    imageFile: '',
    imageUrl: '',
  }),
  computed: {
    photoTitle() {
      return this.$store.getters.getUserProfile.full_name;
    },
    userId() {
      return this.$store.getters.getUserInfo.username;
    },
    // imageUrl: {
    //   get() {
    //     if (this.$store.getters.getUserProfile.photo) {
    //       return this.$store.getters.getUserProfile.photo;
    //     }
    //     return '';
    //   },
    //   set(newValue) { this.$store.commit('setUserProfilePhoto', newValue); },
    // },
  },
  mounted() {
    this.initValue();
  },
  methods: {
    getName() {
      return this.$electron.remote.app.getName();
    },
    submit() {
      /* eslint-disable */
      this.$store.commit('toggleProgressDialog', { visible: true, message: '저장 중 입니다.' });
      
      // db 저장
      const data = new FormData();
      
      data.append('full_name', this.name);
      data.append('nick_name', this.nick_name);
      data.append('email', this.email);
      
      // 새로 선택한 파일이 있으면 추가저장
      if(this.imageFile) {
        data.append('photo', this.imageFile, this.$store.getters.getUserInfo.id + '.' + this.imageFile.name.split('.').pop());
      }
      setTimeout(() => {
        this.$http({
          method: 'put',
          url: `/api/user_profiles/${this.$store.getters.getUserInfo.id}/`,
          headers: {
            'Content-Type': 'multipart/form-data',
          },        
          data: data,
        }).then((response) => {
          if(response.status === 200) {
            this.$store.commit('toggleMyInfoDialog', false);
            // state 업데이트
            this.$store.commit('setUserProfilePhoto', this.imageUrl);
            this.$store.commit('toggleProgressDialog', { visible: false, message: '' });
          }
        }).catch((error) => {
          this.$store.commit('toggleProgressDialog', { visible: false, message: '' });
        });
      }, 1000);

    },
    initValue() {
      this.name = this.$store.getters.getUserProfile.full_name;
      this.nick_name = this.$store.getters.getUserProfile.nick_name;
      this.imageUrl = this.$store.getters.getUserProfile.photo;
      this.email = this.$store.getters.getUserProfile.email;
    },
    cancel() {
      this.$store.commit('toggleMyInfoDialog', false);
      setTimeout(() => {
        this.initValue();
      }, 1000);
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf('.') <= 0) {
          return;
        }
        
        const fileName = files[0].name;
        const fr = new FileReader();

        fr.readAsDataURL(files[0]);

        fr.addEventListener('load', () => {

          const img = new Image();
          img.src = fr.result;

          img.onload = () => {
            const width = 600;
            const scaleFactor = width / img.width;
            
            const elem = document.createElement('canvas');
            elem.width = width;
            elem.height = img.height * scaleFactor;
            const ctx = elem.getContext('2d');
            // img.width and img.height will give the original dimensions
            ctx.imageSmoothingEnabled = true;
            ctx.mozImageSmoothingEnabled = true;
            ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
            
            ctx.canvas.toBlob((blob) => {
              const file = new File([blob], fileName, {
                  type: 'image/png',
                  lastModified: Date.now()
              });
              
              this.imageUrl = img.src;
              this.imageFile = file; // this is an image file that can be sent to server...
              
            }, 'image/png', 1);
          },
          fr.onerror = error => console.log(error);
          // this.imageUrl = fr.result;
          // this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = '';
        this.imageFile = '';
        this.imageUrl = '';
      }
      // console.log(this.imageName);
      // console.log(this.imageUrl);
    },
  },
};
</script>

<style>

</style>
