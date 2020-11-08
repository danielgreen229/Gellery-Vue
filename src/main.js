/* Компонент Home отрисовывает картинки*/
const Home = {
  data: function () {
    return {
      images: [ /* загрузка картинок*/
        {
          title: 'Marble',
          description: 'Blue',
          href: 'https://avatars.mds.yandex.net/get-pdb/1767558/264f40b2-f1c4-4ef5-a678-6d24742df247/s1200',
        },
        {
          title: 'Marble',
          description: 'White',
          href: 'https://dommramor.ru/wp-content/uploads/2019/08/s1200-6.jpg',
        },
        {
          title: 'Marble',
          description: 'Pink and blue',
          href: 'https://posterpopart.com/image/cache/catalog/Tovari/Fotofon/Marble/FFMAR20-wd-1200x1200.jpg',
        },
        {
          title: 'Marble',
          description: 'Brown',
          href: 'https://posterpopart.com/image/cache/catalog/Tovari/Fotofon/Marble/FFMAR16-wd-1200x1200.jpg',
        },
        {
          title: 'Marble',
          description: 'Blue',
          href: 'http://st.gde-fon.com/wallpapers_original/647870_tekstura_teksturyi_kamen_tekstura-kamnya_faktura_k_2000x2000_www.Gde-Fon.com.jpg',
        },
        {
          title: 'Marble',
          description: 'White and blue',
          href: 'https://st-gdefon.gallery.world/wallpapers_original/646900_gallery.world.jpg',
        },
        {
          title: 'Marble',
          description: 'Blue and black',
          href: 'http://st.gde-fon.com/wallpapers_original/654712_tekstura_teksturyi_kamen_tekstura-kamnya_faktura_k_2200x2200_www.Gde-Fon.com.jpg',
        },
        {
          title: 'Marble',
          description: 'Blue and yellow',
          href: 'http://www.fotooboi.ru/upload/iblock/b00/b005746a247f49460113f61150013f6f.jpg',
        },
        {
          title: 'Marble',
          description: 'White and black',
          href: 'https://st3.depositphotos.com/6703620/19103/i/950/depositphotos_191033482-stock-photo-marble-abstract-acrylic-background-nature.jpg',
        },
      ],
      index: null /* Индекс для выбора картинки */
    };
  },
  methods: {
  	shuffle: function () {
    	this.images = _.shuffle(this.images) /* Перемешивание картинок */
    }
  },
  components: {
    'gallery': VueGallery /* Компонент для тэга gallery, увеличивает картинку и осуществляет свайпы */
  },
  template:
  `
  <div>
    <gallery  :images="images" :index="index" @close="index = null"></gallery>
    <div class="posts">
      <transition-group name="cell">
        <div class="image post-itm"
            v-for="(image, imageIndex) in images"
            @click="index = imageIndex"
            :key="image.href"
            :style="{ backgroundImage: 'url(' + image.href + ')', width: '320px', height: '200px' }">
        </div>
      </transition-group>
      <button  class="Button1" @click="shuffle">SHUFFLE</button>
    </div>
  </div>

`}/* С помощью v-for="(image, imageIndex) in images" рисует картинки из ссылок из images.
     При нажатие на картинку назначается индекс и открывается картинка
     Так же кнопка с классом Button1 при нажатие ссылается на метод shuffle и мешает картинки
  */


/* Компонент About - выводит заголовок и список*/
const About = { template: `
  <div class="about">
    <h1>About Us:</h1>
    <li>mail: mr_daniel31@mail.ru </li>
    <li>telephone:+79171715789 </li>
  </div>
`}

/* Компонент Контакт содержит локальные переменные Name, Phone, Message */
const Contact = {
  data: function ()
  {
    return {
      Name: "",
      Phone: "",
      Message: "",
    }
  },
  mounted() {
    /* 
      Cохраняет введенные данные на стороне пользователя,
      что увеличивает производительность
    */
    if (localStorage.Name) {
      this.Name = localStorage.Name;
    }
    if (localStorage.Phone) {
      this.Phone = localStorage.Phone;
    }
  },
  methods: {
    persist() { //Записывает в локальное хранилище
      localStorage.Name = this.Name;
      localStorage.Phone = this.Phone;

    },
    bind(el) { // биндит элемент и записывает числа в форму, используя паттерн
      el.oninput = function(e) {
        if (!e.isTrusted)
        {
          return;
        }
        let x = this.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        el.dispatchEvent(new Event('input'));
      }
    }
  },
  template: `
    <form>
      <input class="inputer" v-model="Name" placeholder="Name">
      <p class="error" v-if="Name.length < 3 && Name != ''">The name cant contain less than 3 symbols</p>
      <div>
        <p v-if="Name == '' || Name.length >= 3" class="num">+7</p>
        <p v-if="Name.length < 3 && Name.length != 0" class="num">+7</p>
        <input type="space"
            v-model="Phone"
            name="Phone"
            id="Phone"
            placeholder="(555) 555-5555"
            autocomplete="tel"
            maxlength="14"
            class="inputer"
            v-Phone
            pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}" required/>
      </div>
      <p class="error" v-if="Phone.length < 14 && Phone != ''">The m.p cant contain less than 11 symbols</p>
      <textarea class="inputer" type="text" v-model="Message" placeholder="Message to us"></textarea>
      <p class="error" v-if="Message.length > 250">The message cant contain more than 250 symbols</p>
      <button  class="Button" @click="persist" >Send</button>
      <div class="box1"></div>
    </form>
`}
/* 
  Проверяет размеры в input, используя v-if и если длина меньше чем заданно в условии,
  выводит параграф сообщающий об ошибке
*/
Vue.directive('Phone', {
  bind(el) {
    el.oninput = function(e) {
      if (!e.isTrusted) {
        return;
      }

      let x = this.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      el.dispatchEvent(new Event('input'));
    }
  }
});//директива для создания формы заполнения телефона




/* routes перечисляет доступные роутеры*/
const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/about', component: About},
  { path: '/contact', component: Contact}
]

const router = new VueRouter({
  routes
})

//Приложение содержание роутеры и отображение шторки с show
var app = new Vue({
  router,
  data: {
    show: false,
  },
}).$mount('#app');
