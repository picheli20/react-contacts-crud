const UserCompanyfields = [
  {
    label: 'Nome',
    type: 'text',
    name: 'name',
    validators: [
      'required',
      'minStringLength:3',
      'maxStringLength: 100',
    ],
    errorMessages: [
      'Este campo é obrigatório',
      'Este campo tem que ter mais que 3 caracteres',
      'Este campo tem que ter menos que 100 caracteres',
    ],
    visible: true,
  },
  {
    label: 'CPF',
    type: 'text',
    name: 'cpf',
    validators: [
      'required',
      'minStringLength:11',
      'maxStringLength:11',
    ],
    errorMessages: [
      'Este campo é obrigatório',
      'Este campo tem que ter 11 dígitos',
      'Este campo tem que ter 11 dígitos',
    ],
    visible: true,
  },
  {
    label: 'CNPJ',
    type: 'text',
    name: 'cnpj',
    validators: [
      'required',
      'minStringLength:14',
      'maxStringLength:14',
    ],
    errorMessages: [
      'Este campo é obrigatório',
      'Este campo tem que ter 14 dígitos',
      'Este campo tem que ter 14 dígitos',
    ],
    visible: true,
  },
  {
    label: 'Gênero',
    type: 'select',
    name: 'gender',
    options: [
      { label: 'Masculino', value: 'm'},
      { label: 'Feminino', value: 'f'},
    ],
    validators: ['required'],
    errorMessages: ['Este campo é obrigatório'],
    visible: true,
  },
  {
    label: 'Website',
    name: 'website',
    type: 'text',
    validators: ['required'],
    errorMessages: ['Este campo é obrigatório'],
    visible: true,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'text',
    validators: [
      'required',
      'isEmail',
    ],
    errorMessages: [
      'Este campo é obrigatório',
      'Favor inserir um email válido',
    ],
    visible: true,
  },
  {
    label: 'Telefone',
    name: 'telephone',
    type: 'text',
    validators: ['required'],
    errorMessages: ['Este campo é obrigatório'],
    visible: true,
  },
];

const addressFields = [
  {
    label: 'CEP',
    name: 'zip',
    type: 'text',
    validators: [
      'required',
      'minStringLength:8',
    ],
    errorMessages: [
      'Este campo é obrigatório',
      'Este campo tem que ter mais que 8 caracteres',
    ],
    onBlurFunction: 'searchZip',
    visible: true,
  },
  {
    label: 'Rua',
    name: 'streetName',
    type: 'text',
    validators: ['required'],
    errorMessages: ['Este campo é obrigatório'],
    visible: true,
  },
  {
    label: 'Numero',
    name: 'streetNumber',
    type: 'text',
    validators: [
      'required',
      'isPositive',
    ],
    errorMessages: [
      'Este campo é obrigatório',
      'Este campo tem que ser somente números',
    ],
    visible: true,
  },
  {
    label: 'Complemento',
    name: 'complement',
    type: 'text',
    validators: [],
    errorMessages: [],
    visible: true,
  },
  {
    label: 'Bairro',
    name: 'neighborhood',
    type: 'text',
    validators: ['required'],
    errorMessages: ['Este campo é obrigatório'],
    visible: true,
  },
  {
    label: 'Cidade',
    name: 'city',
    type: 'text',
    validators: ['required'],
    errorMessages: ['Este campo é obrigatório'],
    visible: true,
  },
  {
    label: 'Estado',
    name: 'state',
    type: 'text',
    validators: [
      'required',
      'minStringLength:2',
      'maxStringLength:2',
    ],
    errorMessages: [
      'Este campo é obrigatório',
      'Este campo tem que ter 2 dígitos',
      'Este campo tem que ter 2 dígitos',
    ],
    visible: true,
  },
  {
    label: 'Pais',
    name: 'country',
    type: 'text',
    validators: ['required'],
    errorMessages: ['Este campo é obrigatório'],
    visible: true,
  },
];

// add custom rules for the company form
const companyInfoFields: IField[]  = [...UserCompanyfields].map((item: IField) => {
  // remove reference from the original object
  item = {...item};
  switch (item.name) {
    case 'cpf':
      item.visible = false;
      break;
    case 'gender':
      item.validators = [];
      item.errorMessages = [];
      break;
  }

  return item;
});

// add custom rules for the user form
const userInfoFields: IField[] = [...UserCompanyfields].map((item: IField) => {
  // remove reference from the original object
  switch (item.name) {
    case 'cnpj':
      item.visible = false;
      break;
    case 'website':
      item.validators = [];
      item.errorMessages = [];
      break;
  }

  return item;
});

export const fields = {
  address: addressFields,
  userInfo: {
    company: companyInfoFields,
    user: userInfoFields,
  },
};

export interface IField {
  label: string;
  name: string;
  type: 'text' | 'select';
  validators: string[];
  errorMessages: string[];
  visible: boolean;
  options: { label: string, value: string }[];
  onBlurFunction?: 'searchZip';
};
