<template>
  <form class="meetup-form">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">
        <UiFormGroup label="Название">
          <UiInput name="title" v-model="copyMeetup.title" />
        </UiFormGroup>
        <UiFormGroup label="Дата">
          <UiInputDate type="date" name="date" v-model="copyMeetup.date" />
        </UiFormGroup>
        <UiFormGroup label="Место">
          <UiInput name="place" v-model="copyMeetup.place" />
        </UiFormGroup>
        <UiFormGroup label="Описание">
          <UiInput multiline rows="3" name="description" v-model="copyMeetup.description" />
        </UiFormGroup>
        <UiFormGroup label="Изображение">
          <!--
               Предлагается сохранять файл для будущей загрузки во временное поле imageToUpload
               и передавать в объекте со всеми данными формы
          -->
          <ui-image-uploader
            name="image"
            :preview="meetup.image"
            @select="copyMeetup.imageToUpload = $event"
            @remove="copyMeetup.imageToUpload = null"
          />
        </UiFormGroup>
      </fieldset>

      <h3 class="meetup-form__agenda-title">Программа</h3>
      
      <meetup-agenda-item-form
        v-for="(agendaItem, index) in copyMeetup.agenda"
         :key="agendaItem.id"
         v-model:agenda-item="copyMeetup.agenda[index]"
         @remove="removeAgenda(index)"
         class="meetup-form__agenda-item"
       />
      

      <div class="meetup-form__append">
        <button @click="createAgenda" class="meetup-form__append-button" type="button" data-test="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <ui-button @click="$emit('cancel')" variant="secondary" block class="meetup-form__aside-button" data-test="cancel">Отмена</ui-button>
        <ui-button @click.prevent="sendData" variant="primary" block class="meetup-form__aside-button" data-test="submit" type="submit">
          {{ submitText }}
        </ui-button>
      </div>
    </div>
  </form>
</template>

<script>
import { klona } from 'klona';
import { dequal } from 'dequal';
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import UiButton from './UiButton.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiImageUploader from './UiImageUploader.vue';
import UiInput from './UiInput.vue';
import UiInputDate from './UiInputDate.vue';
import { createAgendaItem } from '../meetupService.js';

export default {
  name: 'MeetupForm',

  components: {
    MeetupAgendaItemForm,
    UiButton,
    UiFormGroup,
    UiImageUploader,
    UiInput,
    UiInputDate,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },

    submitText: {
      type: String,
      default: '',
    },
  },

  emits: ['cancel', 'submit'],

  data() {
    return {
      copyMeetup: klona(this.meetup),
    }
  },

  methods: {
    createAgenda() {
      const newAgenda = createAgendaItem();

      if (this.copyMeetup.agenda.length) {
        const endTime = this.copyMeetup.agenda.at(-1).endsAt;
        newAgenda.startsAt = endTime;
      }
      this.copyMeetup.agenda.push(newAgenda);

    },

    removeAgenda(index) {
      this.copyMeetup.agenda.splice(index, 1);
    },

    sendData() {
    if (this.copyMeetup.imageToUpload) {
      this.copyMeetup.image = this.copyMeetup.imageToUpload;
    };
    
    this.$emit('submit', klona(this.copyMeetup));
  },
  },

  


};


</script>

<style scoped>
.meetup-form__section {
  border: none;
}

.meetup-form__agenda-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  color: var(--body-color);
  margin: 0 0 24px 0;
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside-button {
  margin: 0 0 12px 0;
}

.meetup-form__agenda-item + .meetup-form__agenda-item {
  margin-top: 24px;
}

.meetup-form__append {
  margin-top: 24px;
}

.meetup-form__append-button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.meetup-form__append-button:hover {
  text-decoration: underline;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside-stick {
    position: sticky;
    top: 32px;
  }
}
</style>
