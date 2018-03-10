(
  userInfo: UserInfo,
  address: Address
)

UserInfo (
  name: String, //minLength: 3, maxLength: 100
  cpf: String, //length: 11
  cnpj: String, //length: 14
  gender: Char,
  website: String,
  email: String,
  telephone: String
)

Address (
  streetName: String,
  streetNumber: Int,
  neighborhood: String,
  complement: String,
  zip: String, //minLength: 8
  city: String,
  state: String, //length: 2
  country: String
)


{
  userInfo:
}
