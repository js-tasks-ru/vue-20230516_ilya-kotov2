<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown title="Тип" v-model="localAgendaItem.type" :options="$options.agendaItemTypeOptions" name="type" />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput type="time" v-model.lazy="localAgendaItem.startsAt" placeholder="00:00" name="startsAt" />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput type="time" v-model.lazy="localAgendaItem.endsAt" placeholder="00:00" name="endsAt" />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup :label="availableField?.title" v-if="availableField?.title">
      <UiInput name="title" v-model="localAgendaItem.title" />
    </UiFormGroup>
    <UiFormGroup :label="availableField?.speaker" v-if="availableField?.speaker">
      <UiInput name="speaker" v-model="localAgendaItem.speaker" />
    </UiFormGroup>
    <UiFormGroup :label="availableField?.description" v-if="availableField?.description">
      <UiInput multiline name="description" v-model="localAgendaItem.description" />
    </UiFormGroup>
    <UiFormGroup :label="availableField?.language" v-if="availableField?.language">
      <UiDropdown
        title="Язык"
        v-model="localAgendaItem.language"
        :options="$options.talkLanguageOptions"
        name="language"
      />
    </UiFormGroup>
  </fieldset>
</template>

<script>
import { klona } from 'klona';
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['remove', 'update:agendaItem'],

  data() {
    return {
      localAgendaItem: klona(this.agendaItem),
    };
  },

  methods: {
    convertHoursInMSeconds(time) {
      const timeMin = time.split(':');
      return (parseInt(timeMin[0]) * 60 + parseInt(timeMin[1])) * 60 * 1000;
    },
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', klona(this.localAgendaItem));
      },
    },

    'localAgendaItem.startsAt'(newValue, oldValue) {
      const endTime = this.convertHoursInMSeconds(this.localAgendaItem.endsAt);
      const startTimeOld = this.convertHoursInMSeconds(oldValue);
      const startTimeNew = this.convertHoursInMSeconds(newValue);

      const timeDelta = endTime - startTimeOld;
      const newEndTime = new Date(startTimeNew + timeDelta);

      const hours = String(newEndTime.getUTCHours()).padStart(2, '0');
      const minut = String(newEndTime.getUTCMinutes()).padStart(2, '0');

      this.localAgendaItem.endsAt = `${hours}:${minut}`;
    },
  },

  computed: {
    availableField() {
      const result = {};

      if (this.localAgendaItem.type === 'talk') {
        result.title = 'Тема';
        result.speaker = 'Докладчик';
        result.description = 'Описание';
        result.language = 'Язык';
      } else if (this.localAgendaItem.type === 'other') {
        result.title = 'Заголовок';
        result.description = 'Описание';
      } else {
        result.title = 'Нестандартный текст (необязательно)';
      }

      return result;
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
